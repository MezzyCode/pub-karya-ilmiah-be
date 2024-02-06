# pub-karya-ilmiah-be

Back-end for [pub-karya-ilmiah](https://github.com/MezzyCode/pub-karya-ilmiah)

## Prerequisites

- Yarn 2 - The project is created using Yarn 2.
- PostgreSQL - Ensure PostgreSQL is installed and running.

## Installation

Clone the repository and install the dependencies:

```bash
yarn install
```

### Database Setup

This project requires a PostgreSQL table. Execute the following SQL commands to set up the required table:

```sql
-- Table: public.projects

-- DROP TABLE IF EXISTS public.projects;

CREATE TABLE IF NOT EXISTS public.projects
(
    project_id uuid NOT NULL,
    project_created_by uuid NOT NULL,
    project_collaborator character varying(255) COLLATE pg_catalog."default",
    project_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    project_created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    project_updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    project_img character varying(255) COLLATE pg_catalog."default",
    project_desc text COLLATE pg_catalog."default",
    project_lang character varying(255) COLLATE pg_catalog."default",
    project_status character varying(20) COLLATE pg_catalog."default",
    project_article text COLLATE pg_catalog."default",
    project_source_code text COLLATE pg_catalog."default",
    project_rating numeric,
    project_review text COLLATE pg_catalog."default",
    project_reviewer character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT projects_pkey PRIMARY KEY (project_id),
    CONSTRAINT fk_project_created_by FOREIGN KEY (project_created_by)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id uuid NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT USER,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT email_unique UNIQUE (email),
CONSTRAINT valid_roles_chk CHECK (role::text= ANY (ARRAY['user'::character varying, 'superuser'::character varying, 'admin'::character varying, 'superadmin'::character varying]::text[])) NOT VALID
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.projects
    OWNER to postgres;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

COMMENT ON CONSTRAINT email_unique ON public.users
    IS 'Email must be Unique!';
```

### Environment Variables

Create a .env file in the root directory with the following content:

```ini
PORT=3000

# POSTGRES
PG_DB_HOST=localhost
PG_DB_USER=postgres
PG_DB_PASSWORD=admin
PG_DB_NAME=postgres
PG_DB_PORT=5432
PG_DB_MAX=10
PG_IDLE_TIMEOUT=1000
```

### Launching

```bash
yarn node index.js
```
