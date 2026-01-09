import FormSetPass from "@/app/components/FormSetPass";

export default function page() {
    return (
        <main className="min-h-screen justify-items-center content-center p-6 md:p-20">
            <section className="text-center">
                <h1 className="font-bold text-2xl">ตั้งค่ารหัสผ่านใหม่</h1>

                <FormSetPass />
            </section>
        </main>
    )
}
