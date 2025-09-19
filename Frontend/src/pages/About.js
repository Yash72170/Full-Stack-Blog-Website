// import userContext from "../context/userContext";
// import Base from "../components/Base";

// const About = () => {
//   return (
//     <userContext.Consumer>
//       {(object) => (
//         <Base>
//           <h1>This is about page</h1>
//           <p>we are building blog website</p>
//           {console.log(object)}
//           <h1>Welcome user: {object.user.login && object.user.data.name}</h1>
//         </Base>
//       )}
//     </userContext.Consumer>
//   );
// };

// export default About;


import React from "react";
import userContext from "../context/userContext";
import Base from "../components/Base";

// MUI imports
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Divider,
} from "@mui/material";

const About = () => {
  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "90vh",
              backgroundColor: "#f4f6f8",
              p: 3,
            }}
          >
            <Card
              sx={{
                maxWidth: 400,
                width: "100%",
                boxShadow: 5,
                borderRadius: 3,
                textAlign: "center",
                p: 2,
              }}
            >
              {/* Avatar */}
              <Avatar
                src={
                  object?.user?.data?.avatar_url ||
                  "https://via.placeholder.com/150"
                }
                alt={object?.user?.data?.name || "User"}
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                  mb: 2,
                  border: "3px solid #3f51b5",
                }}
              />

              {/* User Info */}
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {object?.user?.login
                    ? object?.user?.data?.name
                    : "Guest User"}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {object?.user?.data?.bio ||
                    "Welcome to our Blog Website! 🚀"}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {object?.user?.login && (
                  <Box textAlign="left" sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Username:</strong> {object?.user?.login}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Email:</strong>{" "}
                      {object?.user?.data?.email || "Not provided"}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Location:</strong>{" "}
                      {object?.user?.data?.location || "Unknown"}
                    </Typography>
                  </Box>
                )}
              </CardContent>

              {/* Project About Section */}
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                About This Project
              </Typography>
              <Typography variant="body2" color="text.secondary" px={2} pb={2}>
                We are building a modern blog website where users can share
                ideas, explore new topics, and connect with others 🌍.
              </Typography>
            </Card>
          </Box>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default About;
