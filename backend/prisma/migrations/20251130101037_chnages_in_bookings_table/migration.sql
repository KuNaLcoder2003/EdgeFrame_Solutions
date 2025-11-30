-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "meeting_id" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "meeting_start_url" TEXT NOT NULL DEFAULT '';
