CREATE TABLE "boards" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "boards_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1)
);
--> statement-breakpoint
CREATE TABLE "breaks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "breaks_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"public_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"region" text NOT NULL,
	"country" text,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"break_type" text NOT NULL,
	"best_season" text NOT NULL,
	"rating" integer NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" integer NOT NULL,
	CONSTRAINT "breaks_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "breaks_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "challenges_faced" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "challenges_faced_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"journal_entry_id" integer NOT NULL,
	"challenge" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crowd_conditions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "crowd_conditions_id" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"journal_entry_id" integer NOT NULL,
	"vibe" text NOT NULL,
	"volume" text NOT NULL,
	"skill_level" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "environment_conditions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "environment:conditions_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"journal_entry_id" integer NOT NULL,
	"current" text NOT NULL,
	"rock_danger" text NOT NULL,
	"water_quality" text NOT NULL,
	"water_surface" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gear_used" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gear_used_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"journal_entry_id" integer NOT NULL,
	"boardId" integer NOT NULL,
	"wetsuit_thickness" text,
	"gloves" boolean DEFAULT false NOT NULL,
	"boots" boolean DEFAULT false NOT NULL,
	"hood" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "journal_entry_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" uuid NOT NULL,
	"type" text NOT NULL,
	"break_id" integer NOT NULL,
	"date" timestamp NOT NULL,
	"start_time" text NOT NULL,
	"end_time" text NOT NULL,
	"synced_at" timestamp,
	CONSTRAINT "journal_entries_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "marine_life" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "marine_life_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"journal_entry_id" integer NOT NULL,
	"species" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "personal_performance" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "personal_performance_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"journal_entry_id" integer NOT NULL,
	"performance_rating" integer NOT NULL,
	"feeling" text NOT NULL,
	"comments" text
);
--> statement-breakpoint
CREATE TABLE "wave_conditions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "wave_conditions_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"journal_entry_id" integer NOT NULL,
	"height" text NOT NULL,
	"frequency" text NOT NULL,
	"character" text NOT NULL,
	"tide_movement" text NOT NULL,
	"peel_direction" text NOT NULL,
	"wave_wall_shape" text NOT NULL,
	"peel_speed" text NOT NULL,
	"steepness" text NOT NULL,
	"shallowness" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wind_conditions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "wind_conditions_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"journal_entry_id" integer NOT NULL,
	"direction" text NOT NULL,
	"consistency" text NOT NULL,
	"strength" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "countries_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"country" varchar(100) NOT NULL,
	"code" varchar(2) NOT NULL,
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "currencies_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"currency" varchar(50) NOT NULL,
	"code" varchar(3) NOT NULL,
	CONSTRAINT "currencies_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "languages_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"language" varchar(100) NOT NULL,
	"code" varchar(6) NOT NULL,
	CONSTRAINT "languages_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "regions_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"country_id" integer NOT NULL,
	"region" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "roles_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"role" varchar(50) NOT NULL,
	CONSTRAINT "roles_role_unique" UNIQUE("role")
);
--> statement-breakpoint
ALTER TABLE "breaks" ADD CONSTRAINT "breaks_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "challenges_faced" ADD CONSTRAINT "challenges_faced_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crowd_conditions" ADD CONSTRAINT "crowd_conditions_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "environment_conditions" ADD CONSTRAINT "environment_conditions_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gear_used" ADD CONSTRAINT "gear_used_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_break_id_breaks_id_fk" FOREIGN KEY ("break_id") REFERENCES "public"."breaks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marine_life" ADD CONSTRAINT "marine_life_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_performance" ADD CONSTRAINT "personal_performance_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wave_conditions" ADD CONSTRAINT "wave_conditions_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wind_conditions" ADD CONSTRAINT "wind_conditions_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regions" ADD CONSTRAINT "regions_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;