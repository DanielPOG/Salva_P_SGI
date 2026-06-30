Stack: 
    ·Next.js, TypeScript, Tailwind CSS y Bases de Datos Relacionales
Objetivo:
    ·Sistema de gestión de sedes y dispositivos médicos.
Herramientas:
    - El proyecto utilizara Supabase como provedor de PostgreSQL
    Personal:
    Pnpm: Gestor de paquetes
    Graphql: Lenguaje de apis
    Documentacion: Contentlayer / ??? 

Lógica de Negocio y Server Actions:
    
    !!!!Implementar la persistencia de datos utilizando Next.js Server Actions para los métodos POST y DELETE.!!!!!
    Integrar zod


Diseño de bd:
    · Name DataBase = SGI
    Tables: 
        companies:
            · id
            · nombre
            · NIT
            · fecha_creacion
        locations:
            · id
            · comnpany_id (FK)
            · nombre_sede
            · ciudad
            · direccion 
            · estado (activa/inactiva)
        devices:
            . id
            . serial
            . company_id (FK)

Estructura y organizacion del proyecto:
