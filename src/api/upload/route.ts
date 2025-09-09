

// import { NextResponse } from "next/server";
// import fs from "fs/promises"; 

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request: Request) {
//   try {
//     const data = await request.formData();
//     const file: File | null = data.get("image") as unknown as File; 

//     if (!file) {
//       return NextResponse.json(
//         { message: "No file uploaded." },
//         { status: 400 }
//       );
//     }

//     const bytes = await file.arrayBuffer(); 
//     const buffer = Buffer.from(bytes);

//     const filePath = `./public/uploads/${file.name}`;
//     await fs.writeFile(filePath, buffer);

//     console.log(`File saved to ${filePath}`);

//     return NextResponse.json(
//       {
//         message: "File uploaded successfully",
//         fileName: file.name,
//         fileSize: file.size,
//         filePath: `/uploads/${file.name}`,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error", error },
//       { status: 500 }
//     );
//   }
// }
