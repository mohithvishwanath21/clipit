import ErrorPage from "../ErrorPage";
import CreateURL from "../pages/CreateURL";
import MainLayout from "../layout/MainLayout";
import Profile from "../pages/Profile";
import ManageURL from "../pages/ManageURL";
import Analytics from "../pages/Analytics";
import { AnalyticsID } from "../pages/AnalyticsID";


export const protectedRouter = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/create",
        element: <CreateURL />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/view",
        element: <ManageURL />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/analytics/:id",
        element: <AnalyticsID />,
      },
    ],
  },
];
