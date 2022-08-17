import {
     HomeRounded,
     LocalLibraryRounded,
     ContactMailRounded,
     CloudDoneRounded,
     VideoSettingsRounded,
     FeaturedVideoRounded,
     VideoLabelRounded,
     OpenInBrowserRounded,
     RecentActorsRounded,
     SummarizeRounded,
     AdminPanelSettingsRounded,
     MeetingRoomRounded,
     VideoCameraFrontRounded,
} from "@mui/icons-material";

export const sideNavItems = [
     {
          title: "Dashboard",
          icon: <HomeRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: "/",
     },
     {
          title: "Alumnos",
          icon: <LocalLibraryRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: "/students",
     },
     {
          title: "Profesores",
          icon: <ContactMailRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: "/professor",
     },
     {
          title: "Programas",
          icon: <CloudDoneRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/programs'
     },
     {
          title: "Cursos",
          icon: <VideoSettingsRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/courses'
     },
     {
          title: "Material Estudio",
          icon: <FeaturedVideoRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/study-material'
     },
     {
          title: "Material Refuerzo",
          icon: <VideoLabelRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/support-material'
     },
     {
          title: "Inscripciones de Cursos",
          icon: <OpenInBrowserRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/sign-courses'
     },
     {
          title: "Inscrip. Cursos onDemand",
          icon: <VideoCameraFrontRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/sign-ondemand'
     },
     {
          title: "Asistencias",
          icon: <RecentActorsRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/attendance'
     },
     {
          title: "Informes de Progreso",
          icon: <SummarizeRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/progress'
     },
     {
          title: "Administradores",
          icon: <AdminPanelSettingsRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/administrators'
     },
     {
          title: "Cerrar Sesión",
          icon: <MeetingRoomRounded sx={{ fontSize: "20px", mr: 2 }} />,
          url: '/login'
     },
];
