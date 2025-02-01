// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "./button";
// import { Edit2 } from "lucide-react";
// import Image from "next/image";
// import { Musa } from "../../../public/Images";
// import { auth, db } from "@/firebase/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { generateSignature } from "@/actions/actions";

// const EditProfilePic = () => {
//   const [rotation, setRotation] = useState(0);
//   const [scale, setScale] = useState(1);
//   const [imageUrl, setImageUrl] = useState(Musa);


// //   // Assuming you have a way to get these values from your environment/config:
// // const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
// // const UPLOAD_PRESET = "m_enabled";
// // const API_KEY = "718782417437365";

// // // Generate a timestamp
// // const timestamp = Math.round((new Date).getTime()/1000);
// // const signature = generateSignature(API_KEY as string, UPLOAD_PRESET as string, timestamp);

// //   const handleImageUpload = async (event:any) => {
      
// //       // Create a local preview of the image
// //       // const previewUrl = URL.createObjectURL(file);
// //       // setImageUrl(previewUrl);
      
// //       const file = event.target.files[0];
// //       if (!file) return;
    
// //       const formData = new FormData();
// //       formData.append("file", file);
// //       formData.append("upload_preset", UPLOAD_PRESET as string);
// //       formData.append("api_key", API_KEY as string);
// //       formData.append("timestamp", timestamp);
// //       formData.append("signature", signature as string);
    
// //       try {
// //         const response = await axios.post(
// //           `https://api.cloudinary.com/v1_1/dkiimv5vu/image/upload`,
// //           formData
// //         );
// //         const url = response.data.secure_url;
// //         console.log("Uploaded image URL:", url);
// //       } catch (error) {
// //         console.error("Error uploading image:", error);
// //       }
// //   };
  
//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger>
//           <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-white hover:text-gray-300 hover:bg-blue-600 rounded-full h-6 w-6 p-0"
//             >
//               <Edit2 className="w-4 h-4" />
//             </Button>
//           </div>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-center text-accent-foreground mb-4">
//               Upload or Edit Profile Picture
//             </DialogTitle>
//             <div className="relative w-28 h-28 rounded-full overflow-hidden self-center mx-auto">
//               <Image
//                 src={imageUrl}
//                 alt="Profile picture"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-full"
//                 style={{ transform: `rotate(${rotation}deg) scale(${scale})` }}
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-sm font-medium">Rotate</label>
//               <input
//                 type="range"
//                 min="-180"
//                 max="180"
//                 value={rotation}
//                 onChange={(e) => setRotation(e.target.value)}
//                 className="w-full"
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-sm font-medium">Scale</label>
//               <input
//                 type="range"
//                 min="0.5"
//                 max="2"
//                 step="0.1"
//                 value={scale}
//                 onChange={(e) => setScale(e.target.value)}
//                 className="w-full"
//               />
//             </div>
//             <div className="mt-4">
//               <input type="file" onChange={handleImageUpload} className="block w-full" />
//             </div>
//             <DialogDescription>
//               This action cannot be undone. This will permanently delete your
//               account and remove your data from our servers.
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default EditProfilePic;
