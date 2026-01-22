import FormProfiles from "../components/FormProfiles"

function page() {
  return (
    <main className='min-h-screen justify-items-center content-center p-6 md:p-20'>
        <section className='text-center'>
            <h1 className='font-bold text-2xl'>โปรไฟล์</h1>
        </section>

        <FormProfiles />
    </main>
  )
}

export default page