import { Suspense } from "react";
import FormSetProfiles from "@/app/components/FormSetProfiles";

export default function page() {
  return (
    <main className="min-h-screen justify-items-center content-center p-6 md:p-20">
      <section className="text-center">
        <h1 className="font-bold text-2xl">ตั้งค่าบัญชีผู้ใช้ใหม่</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <FormSetProfiles />
        </Suspense>
      </section>
    </main>
  );
}
