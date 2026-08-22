import { AdminCommentsBoard } from "@/components/admin/AdminCommentsBoard";

// The role guard lives in `../layout.tsx`.
export default function AdminCommentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-10">
      <AdminCommentsBoard />
    </main>
  );
}
