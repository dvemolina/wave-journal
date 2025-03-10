ALTER TABLE "journal_entries" ALTER COLUMN "date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "journal_entries" ALTER COLUMN "synced_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD COLUMN "author_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "gear_used" ADD CONSTRAINT "gear_used_boardId_boards_id_fk" FOREIGN KEY ("boardId") REFERENCES "public"."boards"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;