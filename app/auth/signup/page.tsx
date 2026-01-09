import FormSignUp from "@/app/components/FormSignUp";

export default function page() {
    return (
        <main className="min-h-screen justify-items-center content-center p-6 md:p-20">
            <section className="text-center">
                <h1 className="font-bold text-2xl">สมัครใช้งาน</h1>
                <p className="mt-2 mb-8">เริ่มต้นวางแผนการเงินของคุณด้วยระบบวิเคราะห์รายรับรายจ่าย</p>

                <FormSignUp />
            </section>
        </main>
    )
}
