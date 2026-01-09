import FormSignIn from "@/app/components/FormSignIn";

export default function page() {
    return (
        <main className="min-h-screen justify-items-center content-center p-6 md:p-20">
            <section className="text-center">
                <h1 className="font-bold text-2xl">ลงชื่อเข้าใช้</h1>
                <p className="mt-2 mb-8">ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อจัดการเงินของคุณ</p>

                <FormSignIn />
            </section>
        </main>
    )
}
