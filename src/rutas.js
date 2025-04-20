export const rutas = [
    {
      label: "Dashboard",
      path: "/dashboard",
      children: [
        {
          label: "Mapa",
          path: "/dashboard/mapa",
          children: [
            {
              label: "Clientes",
              path: "/dashboard/mapa/clientes",
            }
          ]
        },
        {
          label: "Vehículos",
          path: "/dashboard/vehiculos",
        },
        {
          label: "Perfil",
          path: "/dashboard/perfil",
        },
        {
          label: "Notas de Crédito",
          path: "/dashboard/notas-credito",
        }
      ]
    }
  ];