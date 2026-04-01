import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Form,
  InputGroup
} from "react-bootstrap";
import {
  FiBookOpen,
  FiSettings,
  FiSearch,
  FiHelpCircle
} from "react-icons/fi";

import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./HelpCenterPage.module.css";

export default function HelpCenterPage() {
  return (
    <DashboardLayout>
      <Container fluid className="py-4">

        {/* HEADER */}
        <div className="text-center mb-5">
          <h1 className={styles.helpTitle}>
            Pusat Bantuan
          </h1>
          <p className={styles.helpSubtitle}>
            Temukan panduan penggunaan, alur aplikasi, dan penjelasan fitur RuangTumbuh
          </p>

          {/* SEARCH BAR */}
          <InputGroup
            className={`mt-4 mx-auto ${styles.searchBar}`}
            style={{ maxWidth: "500px" }}
          >
            <InputGroup.Text>
              <FiSearch />
            </InputGroup.Text>
            <Form.Control placeholder="Cari bantuan..." />
          </InputGroup>
        </div>

        {/* CATEGORY CARDS */}
        <Row className="mb-4 justify-content-center">
          <Col md={4} className="d-flex justify-content-center">
            <Card className={`${styles.helpCard} ${styles.helpGreen} h-100 w-100`}>
              <Card.Body>
                <Card.Title className="fw-bold d-flex align-items-center gap-2">
                  <FiBookOpen className={styles.icon} />
                  Panduan Pengguna
                </Card.Title>
                <Card.Text className="text-muted">
                  Pelajari cara menggunakan aplikasi dari awal hingga selesai.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="d-flex justify-content-center">
            <Card className={`${styles.helpCard} ${styles.helpBlue} h-100 w-100`}>
              <Card.Body>
                <Card.Title className="fw-bold d-flex align-items-center gap-2">
                  <FiSettings className={styles.icon} />
                  Fitur Utama
                </Card.Title>
                <Card.Text className="text-muted">
                  Kenali fitur-fitur yang tersedia di dalam aplikasi.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* PANDUAN */}
        <Card className={`${styles.sectionCard} ${styles.sectionPink} mb-4`}>
          <Card.Body>
            <h4 className={`${styles.sectionTitle} d-flex align-items-center gap-2`}>
              <FiBookOpen className={styles.icon} />
              Panduan Pengguna
            </h4>
            <ol className={`text-muted ${styles.helpList}`}>
              <li>Login atau register akun</li>
              <li>Masuk ke dashboard</li>
              <li>Pilih fitur yang ingin digunakan</li>
              <li>Isi data yang diperlukan</li>
              <li>Klik tombol simpan</li>
            </ol>
          </Card.Body>
        </Card>

        {/* FITUR */}
        <Card className={`${styles.sectionCard} ${styles.sectionOrange} mb-4`}>
          <Card.Body>
            <h4 className={`${styles.sectionTitle} d-flex align-items-center gap-2`}>
              <FiSettings className={styles.icon} />
              Penjelasan Fitur
            </h4>
            <ul className={`text-muted ${styles.helpList}`}>
              <li><b>Dashboard:</b> Menampilkan ringkasan aktivitas user</li>
              <li><b>Catatan:</b> Membuat, mengedit, dan menghapus catatan</li>
              <li><b>Pencarian:</b> Mencari data dengan cepat</li>
            </ul>
          </Card.Body>
        </Card>

        {/* FAQ */}
        <Card className={`${styles.sectionCard} ${styles.sectionYellow}`}>
          <Card.Body>
            <h4 className={`${styles.sectionTitle} d-flex align-items-center gap-2`}>
              <FiHelpCircle className={styles.icon} />
              FAQ
            </h4>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Kenapa data saya tidak tersimpan?
                </Accordion.Header>
                <Accordion.Body>
                  Pastikan semua field sudah diisi dengan benar sebelum menyimpan.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Apakah saya bisa mengedit data?
                </Accordion.Header>
                <Accordion.Body>
                  Bisa, klik tombol edit pada data yang ingin diubah.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  Apakah aplikasi ini gratis?
                </Accordion.Header>
                <Accordion.Body>
                  Iya, RuangTumbuh gratis kok! Tapi kita pakai sistem poin sebagai bentuk saling menghargai.
                  Kamu bisa pakai poin untuk belajar dari orang lain, dan juga bisa dapetin poin dengan mengajar atau berbagi ilmu.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  Bagaimana cara menggunakan poin?
                </Accordion.Header>
                <Accordion.Body>
                  Poin digunakan untuk mengikuti sesi belajar dengan pengajar pilihanmu.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>

      </Container>
    </DashboardLayout>
  );
}