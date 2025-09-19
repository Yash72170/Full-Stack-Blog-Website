// import { useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import Base from "../components/Base";
// import CategorySideMenu from "../components/CategorySideMenu";
// import NewFeed from "../components/NewFeed";

// const Home = () => {
//   return (
//     <Base>
//       <Container className="mt-3">
//         <Row>
//           <Col md={2} className="pt-5">
//             <CategorySideMenu />
//           </Col>
//           <Col md={10}>
//             <NewFeed />
//           </Col>
//         </Row>
//       </Container>
//     </Base>
//   );
// };

// export default Home;

import React from "react";
import Base from "../components/Base";
import CategorySideMenu from "../components/CategorySideMenu";
import NewFeed from "../components/NewFeed"; // make sure this returns a list of posts

// MUI imports
import { Container, Grid, Paper, Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Base>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3} lg={2}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                height: "100%",
                borderRadius: 3,
                backgroundColor: "#f8f9fa",
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Categories
              </Typography>
              <CategorySideMenu />
            </Paper>
          </Grid>

          {/* Main Feed */}
          <Grid item xs={12} md={9} lg={10}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
              >
                Latest Posts 🚀
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Stay updated with trending blogs and discussions
              </Typography>

              {/* Posts Grid */}
              <Grid container spacing={3}>
                {/* Instead of NewFeed as one block, 
                    map posts inside NewFeed to display them side by side */}
                <NewFeed />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default Home;
