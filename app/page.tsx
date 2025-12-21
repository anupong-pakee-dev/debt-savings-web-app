export default function page() {

  return (
    <main>
      <header>
        <div>
          <h1>ลดหนี้ เพิ่มเงินออม</h1>
          <p>เริ่มวันนี้ด้วยแผนง่ายๆ</p>
          <button>เริ่มเลย</button>
        </div>
      </header>

      <section>
        <article>
          <h3>ติดตามหนี้ทั้งหมด</h3>
          <p>ดูหนี้ทุกก้อนในแดชบอร์ดเดียว</p>
        </article>
        <article>
          <h3>แผนออมเงินอัตโนมัติ</h3>
          <p>ตั้งเป้าหมาย แล้วให้ระบบออมให้เอง</p>
        </article>
        <article>
          <h3>กลยุทธ์ลดดอกเบี้ย</h3>
          <p>คำแนะนำเฉพาะคุณ เพื่อปิดหนี้เร็วขึ้น</p>
        </article>
      </section>

      <section>
        <h2>ตัวอย่างกราฟการเงิน</h2>

        <figure>
          <canvas></canvas>
          <figcaption>กราฟเปรียบเทียบรายรับและรายจ่ายในแต่ละเดือน</figcaption>
        </figure>

        <p>เดือนมกราคมถึงมิถุนายน รายรับสูงกว่ารายจ่ายโดยเฉลี่ย 20%
          ค่าใช้จ่ายสูดสุดอยู่ในเดือนมีนาคม
        </p>
      </section>

      <section>
        <h2>ติดต่อฉัน</h2>

        <form>
          <label>
            อีเมล
            <input type="email" />
          </label>
          <label>
            ข้อมูล
            <input type="text" />
          </label>
          <button type="submit">ส่งข้อความ</button>
        </form>

        <address>
          Email: mrnu.developer@gmail.com
        </address>
      </section>

      <footer>
        <p>&copy; 2025 Debt & Savings. All rights reserved.</p>
      </footer>
    </main>
  )
}
