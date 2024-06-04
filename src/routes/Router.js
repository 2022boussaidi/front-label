import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const Dashboard = lazy(() => import("../layouts/Dashboard.js"));

/***** Pages ****/


const About = lazy(() => import("../views/About.js"));
/**const Alerts = lazy(() => import("../views/ui/Alerts"));*/
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Dashboard.js"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
/**************components *************************/
const AddUser = lazy(() => import ("../components/users/AddUser.js"))
const EditUser = lazy(() => import ("../components/users/EditUser.js"))

const AddTeam = lazy(() => import ("../components/teams/AddTeam.js"))
const ViewTeam= lazy(() => import ("../components/teams/ViewTeam.js"))
const AddProject = lazy(() => import ("../components/projects/AddProject.js"))
const Projects= lazy(() => import ("../components/dashboard/Projects.js"))
const ViewProject = lazy(() => import ("../components/projects/ViewProject.js"))
const EditProject = lazy(() => import ("../components/projects/EditProject.js"))

const Events = lazy(() => import("../components/dashboard/Events.js"))
const AddEvent = lazy(() => import ("../components/events/AddEvent.js"))
const EditEvent = lazy(() => import ("../components/events/EditEvent.js"))
const Contact = lazy(() => import ("../components/dashboard/ContactCard.js"))
const AddTask = lazy(() => import ("../components/tasks/AddTask.js"))
const EditTask = lazy(() => import ("../components/tasks/EditTask.js"))
const Prediction= lazy(() => import ("../components/dashboard/Glass.js"))

/*******************Sites *******************************************/
const ViewSite = lazy(() => import ("../components/sites/ViewSite.js"))
const OverviewSites = lazy(() => import("../views/OverviewSites.js"));
/***********************************sites*************** */
/*****************************robots**************** */
const OverviewRobots = lazy(() => import("../views/OverviewRobots.js"));
const ViewRobot = lazy(() => import ("../components/robots/ViewRobot.js"))

/**************************robots*************************** */
/*******************************queues***//////////////// */
const OverviewQueues = lazy(() => import("../views/OverviewQueues.js"));
const ViewQueue = lazy(() => import ("../components/queues/ViewQueue.js"))
/******************************///*******queueus */ */
/*******************************scenarios***//////////////// */
const Scenarios = lazy(() => import("../views/OverviewScenarios.js"));

/******************************///*******scenzrios */ */

const Zones = lazy(() => import("../components/dashboard/Zones.js"));
/***********************woks////////////////////////////// */
const Workspaces = lazy(() => import("../components/dashboard/Workspaces.js"));
/*********************************////****users */ */
const Users = lazy(() => import("../components/dashboard/Users.js"));
const Clients = lazy(() => import("../components/dashboard/Client.js"));
const OverviewAnalytics= lazy(() => import("../views/OverviewAnalytics.js"));
const ConsumptionData = lazy(() => import("../views/DataConsumption.js"));
const OverviewLogs= lazy(() => import("../views/OverviewLogs.js"));

const OverviewErrors= lazy(() => import("../views/OverviewErrors.js"));
const OverviewMeasures= lazy(() => import("../views/OverviewMeasures.js"));
const Alert= lazy(() => import("../views/OverviewALerts.js"));
const AlertModel= lazy(() => import("../components/dashboard/Alertmodel.js"));
const OverviewForecasting= lazy(() => import("../views/OverviewForecasting.js"));






    

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
     
      { path: "/", exact: true, element: <FullLayout /> },
     
      
    
      
    ],
  },
  {
    path: "/",
    element: <Dashboard />,
    children: [
      
      { path: "/", exact: true, element: <OverviewSites /> },
      { path: "/sites", exact: true, element: <OverviewSites /> },
      
     
      { path: "/about", exact: true, element: <About /> },
     /* { path: "/alerts", exact: true, element: <Alerts /> },*/
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/inventory", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/adduser", exact: true, element: <AddUser /> },
      { path: "/edituser/:id", exact: true, element: <EditUser /> },

      /*********Sites ********************************************/
      { path: "/viewsite/:id", exact: true, element: <ViewSite /> },
      /*****************sites **************************************
       * /***********************robots*//////////////////////////////////
       { path: "/robots", exact: true, element: <OverviewRobots /> },
       { path: "/viewrobot/:id", exact: true, element: <ViewRobot /> },
       /*********************************robiots ////////////////////////////*/

       /***************************Queuues/////////************* *******************/ 
       { path: "/queues", exact: true, element: <OverviewQueues/> },
       { path: "/viewqueue/:id", exact: true, element: <ViewQueue/> },

       /***************************queussssss ****************************************/
/***********************************SCENARIOS//////////////////////////// */
{ path: "/scenarios", exact: true, element: <Scenarios/> },
/********************zones///////////************************** */ 
{ path: "/zones", exact: true, element: <Zones/> },
{ path: "/workspaces", exact: true, element: <Workspaces/> },
/****************users//////////////////////////// */
{ path: "/users", exact: true, element: <Users/> },
/**********************clients//***************** */ 
{ path: "/clients", exact: true, element: <Clients/> },

/****************************ANlytics*///////////////////////////////// */
{ path: "/analytics", exact: true, element: <OverviewAnalytics/> },

{ path: "/consumption", exact: true, element: <ConsumptionData/> },
{ path: "/logs", exact: true, element: <OverviewLogs/> },
{ path: "/errors", exact: true, element: <OverviewErrors/> },
{ path: "/last_measures", exact: true, element: <OverviewMeasures/> },
{ path: "/alerts", exact: true, element: <Alert/> },
{ path: "/alerts_model", exact: true, element: <AlertModel/> },
{ path: "/prediction", exact: true, element: <OverviewForecasting/> },







/************************************************************************ */





    
      { path: "/addteam", exact: true, element: <AddTeam /> },
      { path: "/viewteam/:id", exact: true, element: <ViewTeam /> },
      { path: "/addproject", exact: true, element: <AddProject /> },
      { path: "/projects", exact: true, element: <Projects /> },
      { path: "/viewproject/:id", exact: true, element: <ViewProject /> },
      { path: "/editproject/:id", exact: true, element: <EditProject /> },
      
      { path: "/events", exact: true, element: <Events /> },
      { path: "/addevent", exact: true, element: <AddEvent /> },
      { path: "/editevent/:id", exact: true, element: <EditEvent /> },
      { path: "/contact", exact: true, element: <Contact /> },
      { path: "/addtask", exact: true, element: <AddTask /> },
      { path: "/edittask/:id", exact: true, element: <EditTask/>},

    ],
  }
];

export default ThemeRoutes;
