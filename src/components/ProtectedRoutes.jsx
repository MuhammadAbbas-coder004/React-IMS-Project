import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebaseconfig/firebaseconfig";
import { useNavigate } from "react-router";

const ProtectedRoutes = ({ component, role }) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAllowed(false);
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const userRoleLower = role.map(r => r.toLowerCase());

        //ADMIN CHECK
        const adminQuery = query(
          collection(db, "admin"),
          where("email", "==", user.email)
        );
        const adminSnap = await getDocs(adminQuery);
        if (!adminSnap.empty && userRoleLower.includes("admin")) {
          setIsAllowed(true);
          setLoading(false);
          return;
        }

        // STUDENT CHECK
        const userQuery = query(
          collection(db, "users"),
        where("email", "==", user.email)
        );
        const userSnap = await getDocs(userQuery);

        if (!userSnap.empty) {
          const userData = userSnap.docs[0].data();
          if (userRoleLower.includes(userData.role.toLowerCase())) {
            setIsAllowed(true);
          } else {
            setIsAllowed(false);
          }
        } else {
          setIsAllowed(false);
        }

      } catch (err) {
        console.error(err);
        setIsAllowed(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [role, navigate]);

  if (loading) return <h1>Loading...</h1>;

  return isAllowed ? component : <h1>Not Allowed</h1>;
};

export default ProtectedRoutes;
