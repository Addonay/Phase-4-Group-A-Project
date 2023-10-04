// import React from 'react';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// function UserDashboard() {
//   return (
//     <section style={{ backgroundColor: '#eee' }}>
//       <Container sx={{ py: 5 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
//               <ol className="breadcrumb mb-0">
//                 <li className="breadcrumb-item"><a href="#">Home</a></li>
//                 <li className="breadcrumb-item"><a href="#">User</a></li>
//                 <li className="breadcrumb-item active" aria-current="page">User Profile</li>
//               </ol>
//             </nav>
//           </Grid>
//         </Grid>

//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={4}>
//             <Paper sx={{ p: 2 }}>
//               <div className="card-body text-center">
//                 <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
//                   className="rounded-circle img-fluid" style={{ width: '150px' }} />
//                 <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>John Smith</Typography>
//                 <Typography variant="body1" color="textSecondary" sx={{ mb: 1 }}>Full Stack Developer</Typography>
//                 <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>Bay Area, San Francisco, CA</Typography>
//                 <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
//                   <Button variant="contained" color="primary" sx={{ marginRight: '8px' }}>Follow</Button>
//                   <Button variant="outlined" color="primary">Message</Button>
//                 </div>
//               </div>
//             </Paper>
//             <Paper sx={{ p: 2 }}>
//               <div className="card-body p-0">
//                 <ul className="list-group list-group-flush rounded-3">
//                   <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                     <i className="fas fa-globe fa-lg text-warning"></i>
//                     <Typography variant="body2">https://mdbootstrap.com</Typography>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                     <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
//                     <Typography variant="body2">mdbootstrap</Typography>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                     <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
//                     <Typography variant="body2">@mdbootstrap</Typography>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                     <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
//                     <Typography variant="body2">mdbootstrap</Typography>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                     <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
//                     <Typography variant="body2">mdbootstrap</Typography>
//                   </li>
//                 </ul>
//               </div>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} lg={8}>
//             <Paper sx={{ p: 2 }}>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-sm-3">
//                     <Typography variant="body1">Full Name</Typography>
//                   </div>
//                   <div className="col-sm-9">
//                     <Typography variant="body2" color="textSecondary">Johnatan Smith</Typography>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-sm-3">
//                     <Typography variant="body1">Email</Typography>
//                   </div>
//                   <div className="col-sm-9">
//                     <Typography variant="body2" color="textSecondary">example@example.com</Typography>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-sm-3">
//                     <Typography variant="body1">Phone</Typography>
//                   </div>
//                   <div className="col-sm-9">
//                     <Typography variant="body2" color="textSecondary">(097) 234-5678</Typography>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-sm-3">
//                     <Typography variant="body1">Mobile</Typography>
//                   </div>
//                   <div className="col-sm-9">
//                     <Typography variant="body2" color="textSecondary">(098) 765-4321</Typography>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-sm-3">
//                     <Typography variant="body1">Address</Typography>
//                   </div>
//                   <div className="col-sm-9">
//                     <Typography variant="body2" color="textSecondary">Bay Area, San Francisco, CA</Typography>
//                   </div>
//                 </div>
//               </div>
//             </Paper>
//             <div className="row">
//               <div className="col-md-6">
//                 <Paper sx={{ p: 2 }}>
//                   <div className="card-body">
//                     <Typography variant="body1" sx={{ mb: 4 }}>
//                       <span className="text-primary font-italic me-1">assigment</span> Project Status
//                     </Typography>
//                     <Typography variant="body2" sx={{ mb: 1, fontSize: '.77rem' }}>Web Design</Typography>
//                     <div className="progress rounded" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                     <Typography variant="body2" sx={{ mt: 4, mb: 1, fontSize: '.77rem' }}>Website Markup</Typography>
//                     <div className="progress rounded" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow="72"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                     <Typography variant="body2" sx={{ mt: 4, mb: 1, fontSize: '.77rem' }}>One Page</Typography>
//                     <div className="progress rounded" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow="89"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                     <Typography variant="body2" sx={{ mt: 4, mb: 1, fontSize: '.77rem' }}>Mobile Template</Typography>
//                     <div className="progress rounded" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                     <Typography variant="body2" sx={{ mt: 4, mb: 1, fontSize: '.77rem' }}>Backend API</Typography>
//                     <div className="progress rounded mb-2" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                   </div>
//                 </Paper>
//               </div>
//               <div className="col-md-6">
//                 <Paper sx={{ p: 2 }}>
//                   <div className="card-body">
//                     <Typography variant="body1" sx={{ mb: 4 }}>
//                       <span className="text-primary font-italic me-1">assigment</span> Project Status
//                     </Typography>
//                     <Typography variant="body2" sx={{ mb: 1, fontSize: '.77rem' }}>Web Design</Typography>
//                     <div className="progress rounded" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                     <Typography variant="body2" sx={{ mt: 4, mb: 1, fontSize: '.77rem' }}>Website Markup</Typography>
//                     <div className="progress rounded" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow="72"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                     <Typography variant="body2" sx={{ mt: 4, mb: 1, fontSize: '.77rem' }}>One Page</Typography>
//                     <div className="progress rounded" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow="89"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                     <Typography variant="body2" sx={{ mt: 4, mb: 1, fontSize: '.77rem' }}>Mobile Template</Typography>
//                     <div className="progress rounded" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                     <Typography variant="body2" sx={{ mt: 4, mb: 1, fontSize: '.77rem' }}>Backend API</Typography>
//                     <div className="progress rounded mb-2" style={{ height: '5px' }}>
//                       <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66"
//                         aria-valuemin="0" aria-valuemax="100"></div>
//                     </div>
//                   </div>
//                 </Paper>
//               </div>
//             </div>
//           </Grid>
//         </Grid>
//       </Container>
//     </section>
//   );
// }

// export default UserDashboard;
