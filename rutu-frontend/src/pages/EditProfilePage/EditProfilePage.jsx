import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./EditProfilePage.module.css";


export default function EditProfilePage() {
 const navigate = useNavigate();


 const [image, setImage] = useState(null);
 const [showPopup, setShowPopup] = useState(false);
 const fileInputRef = useRef();


 const handleImageChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     setImage(URL.createObjectURL(file));
   }
 };


 const handleSave = () => {
   setShowPopup(true);


   setTimeout(() => {
     setShowPopup(false);
     navigate("/profile");
   }, 2000);
 };


 return (
   <DashboardLayout title="Edit Profile">
     <div className={styles.container}>


       {/* HEADER */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className={styles.header}
       >
         <div
           className={styles.avatar}
           onClick={() => fileInputRef.current.click()}
         >
           {image ? <img src={image} alt="" /> : "AJ"}
         </div>


         <h1 className={styles.title}>Edit Profile ✏️</h1>


         <input
           type="file"
           ref={fileInputRef}
           onChange={handleImageChange}
           hidden
         />
       </motion.div>


       {/* FORM */}
       <div className={styles.formSection}>


         <motion.input
           placeholder="Full Name"
           whileFocus={{ scale: 1.03 }}
         />


         <motion.input
           placeholder="Email"
           whileFocus={{ scale: 1.03 }}
         />


         {/* PASSWORD */}
         <div className={styles.passwordBox}>
           <h4>Change Password 🔒</h4>


           <motion.input
             type="password"
             placeholder="Old Password"
             whileFocus={{ scale: 1.02 }}
           />


           <motion.input
             type="password"
             placeholder="New Password"
             whileFocus={{ scale: 1.02 }}
           />


           <motion.input
             type="password"
             placeholder="Confirm Password"
             whileFocus={{ scale: 1.02 }}
           />
         </div>


       </div>


       {/* BUTTON */}
       <div className={styles.btnGroup}>
         <motion.button
           whileTap={{ scale: 0.95 }}
           className={styles.cancel}
           onClick={() => navigate("/profile")}
         >
           Cancel
         </motion.button>


         <motion.button
           whileTap={{ scale: 0.95 }}
           className={styles.save}
           onClick={handleSave}
         >
           Save Changes
         </motion.button>
       </div>


       {/* POPUP */}
       {showPopup && (
         <div className={styles.popup}>
           ✅ Profile berhasil diupdate!
         </div>
       )}


     </div>
   </DashboardLayout>
 );
}
