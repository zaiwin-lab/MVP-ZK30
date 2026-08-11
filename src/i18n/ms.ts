/**
 * Bahasa Malaysia — DEFAULT language and source of truth.
 * Every other dictionary must implement `Dict` (typeof ms).
 * Official spec copy is used verbatim; edit with care.
 */
export const ms = {
  meta: {
    verificationNotice: '', // BM is the source language; no verification banner
  },
  nav: {
    home: 'Utama',
    pathways: 'Dua Laluan',
    benefits: 'Manfaat',
    journey: 'Perjalanan Anda',
    coach: 'Coach & Team',
    faq: 'Soalan Lazim',
    participantLogin: 'Log Masuk Peserta',
    cta: 'Semak Kelayakan Percuma',
    menu: 'Menu',
    close: 'Tutup',
  },
  strip: {
    text: 'Permohonan Semakan Profil Kini Dibuka — Konsultasi Awal Percuma',
    cta: 'Semak Sekarang →',
  },
  hero: {
    eyebrow: 'Program Khas Untuk Usahawan & Pemimpin Organisasi',
    headline1: 'SPM Ke Diploma.',
    headline2: 'Tanpa Berhenti Kerja. Tanpa Mula Dari Kosong.',
    support:
      'Pengalaman perniagaan dan kepimpinan anda dinilai melalui laluan rasmi Diploma Kemahiran Malaysia — persijilan oleh Jabatan Pembangunan Kemahiran (JPK), Kementerian Sumber Manusia Malaysia. Belajar sambil bekerja, dibimbing dari mula hingga penilaian.',
    badges: ['Berdasarkan pengalaman sebenar', 'Bimbingan portfolio', 'Laluan fleksibel', 'Persediaan penilaian'],
    ctaPrimary: 'Semak Kelayakan Percuma',
    ctaSecondary: 'Terokai Dua Laluan',
    ctaMicrocopy: 'Semakan awal percuma. Tiada komitmen. Hanya mengambil masa sekitar 60 saat.',
    card: {
      title: 'Daripada Pengalaman Kepada Laluan Kelayakan',
      steps: ['Semakan pengalaman', 'Pemilihan laluan', 'Bimbingan portfolio', 'Persediaan penilaian'],
      cta: 'Mulakan Semakan Awal →',
    },
    trust: 'Team SPM2Diploma di bawah KOBIS Berhad akan bersama anda sepanjang perjalanan ini.',
  },
  experience: {
    label: 'PENGALAMAN ANDA WAJAR DIIKTIRAF',
    title: 'Pengalaman Anda Kukuh. Tetapi Adakah Kelayakan Anda Mencerminkannya?',
    intro:
      'Ramai usahawan dan pemimpin organisasi telah membina perniagaan, mengurus pasukan, memimpin projek dan menyelesaikan cabaran sebenar selama bertahun-tahun. Namun tanpa kelayakan formal yang sepadan, sebahagian peluang profesional mungkin masih sukar dicapai.',
    items: [
      'Bertahun-tahun membina pengalaman sebenar',
      'Mempunyai tanggungjawab kerja dan keluarga',
      'Mahu meningkatkan keyakinan profesional',
      'Mahu memperkukuh kredibiliti',
      'Mahu menyusun pengalaman sebagai portfolio',
      'Mahu meneroka laluan kelayakan yang bersesuaian',
    ],
  },
  credStrip: [
    'Program dikendalikan oleh KOBIS Berhad',
    'Dibimbing sepenuhnya oleh Team SPM2Diploma',
    'Laluan berdasarkan pengalaman dan bukti kompetensi',
    'Proses penilaian diperlukan',
    'Tidak perlu meninggalkan pekerjaan atau perniagaan',
  ],
  pathways: {
    title: 'Pilih Laluan Anda',
    intro: 'Dua laluan Diploma. Satu untuk pembina perniagaan, satu untuk pemimpin organisasi.',
    card1: {
      name: 'Diploma Kemahiran Keusahawanan',
      levelNote: 'Persijilan oleh Jabatan Pembangunan Kemahiran (JPK) — Kementerian Sumber Manusia Malaysia',
      for: ['Pemilik perniagaan', 'Usahawan', 'Pengurus perniagaan'],
      forTitle: 'Sesuai untuk:',
      message:
        'Anda telah bertahun-tahun membina perniagaan. Kini mungkin masanya mengukuhkan pengalaman itu dengan kelayakan yang lebih tinggi.',
      cta: 'Terokai Laluan Keusahawanan',
      expTitle: 'Bidang pengalaman yang mungkin berkaitan:',
      expAreas: [
        'Operasi perniagaan',
        'Pemasaran dan jualan',
        'Pengurusan kewangan',
        'Pengurusan pelanggan',
        'Penyeliaan pasukan',
        'Perancangan perniagaan',
      ],
    },
    card2: {
      name: 'Diploma Lanjutan Kepimpinan & Pentadbiran Organisasi',
      levelNote: 'Persijilan oleh Jabatan Pembangunan Kemahiran (JPK) — Kementerian Sumber Manusia Malaysia',
      for: [
        'Pemimpin NGO',
        'Pemimpin koperasi',
        'Pemimpin persatuan',
        'Perunding',
        'Pentadbir organisasi',
        'Eksekutif kanan',
      ],
      forTitle: 'Sesuai untuk:',
      message:
        'Anda telah memimpin orang, projek dan organisasi. Kini bawa pengalaman kepimpinan anda ke tahap lebih tinggi.',
      cta: 'Terokai Laluan Kepimpinan',
      expTitle: 'Bidang pengalaman yang mungkin berkaitan:',
      expAreas: [
        'Kepimpinan organisasi',
        'Tadbir urus',
        'Penyelarasan projek',
        'Pentadbiran',
        'Pengurusan pihak berkepentingan',
        'Kepimpinan pasukan',
      ],
    },
    unsure: {
      question: 'Tidak pasti laluan yang sesuai?',
      cta: 'Biarkan Team Kami Membantu Menilai Profil Anda',
    },
  },
  receive: {
    title: 'Apa Yang Anda Akan Terima',
    intro: 'Perjalanan yang tersusun — anda tahu dengan jelas apa yang disediakan untuk anda.',
    items: [
      { title: 'Semakan Profil Awal', body: 'Penilaian awal terhadap pengalaman, latar belakang dan matlamat anda.' },
      { title: 'Cadangan Laluan Bersesuaian', body: 'Team membantu mengenal pasti laluan yang paling relevan.' },
      { title: 'Latihan dan Bimbingan', body: 'Sesi panduan yang disusun untuk membantu peserta memahami perjalanan program.' },
      { title: 'Bimbingan Portfolio', body: 'Bantuan menyusun pengalaman dan bukti berkaitan secara lebih teratur.' },
      { title: 'Senarai Semak Bukti', body: 'Panduan mengenai dokumen dan bukti yang mungkin diperlukan.' },
      { title: 'Persediaan Penilaian', body: 'Bimbingan bagi membantu peserta bersedia menghadapi proses penilaian.' },
      { title: 'Participant Progress Portal', body: 'Checklist dan kemajuan perjalanan peserta dalam satu tempat.' },
      { title: 'Sokongan Team SPM2Diploma', body: 'Bantuan melalui team program dan saluran WhatsApp rasmi.' },
    ],
  },
  midCta: {
    title: 'Tidak Pasti Sama Ada Pengalaman Anda Sesuai?',
    body: 'Anda tidak perlu membuat keputusan sendiri. Lengkapkan semakan awal percuma dan Team SPM2Diploma akan membantu mengenal pasti laluan yang lebih bersesuaian.',
    ctaPrimary: 'Semak Kelayakan Dalam 60 Saat',
    ctaWhatsapp: 'Tanya Melalui WhatsApp',
  },
  official: {
    title: 'Bagaimana Laluan Ini Berfungsi Secara Rasmi',
    points: [
      'Pengalaman berkaitan anda disemak terlebih dahulu.',
      'Peserta mungkin perlu mengemukakan bukti pengalaman.',
      'Penyediaan portfolio mungkin diperlukan.',
      'Latihan dan bimbingan mungkin diperlukan.',
      'Proses penilaian formal terlibat.',
      'Penyertaan tidak menjamin pensijilan secara automatik.',
      'Pensijilan bergantung kepada keperluan kompetensi dan penilaian yang ditetapkan.',
    ],
    pendingNote:
      'Maklumat rasmi kelayakan, NOSS dan rakan penilaian sedang melalui proses pengesahan akhir. Maklumat yang disahkan akan diterangkan kepada pemohon semasa sesi semakan profil.',
  },
  transform: {
    title: 'Bayangkan Kedudukan Anda Selepas Melengkapkan Perjalanan Ini',
    items: [
      'Pengalaman anda lebih tersusun dan dapat dipersembahkan secara profesional.',
      'Anda lebih memahami nilai kompetensi yang telah dibina.',
      'Profil profesional anda menjadi lebih kukuh.',
      'Anda lebih yakin dalam peranan perniagaan atau kepimpinan.',
      'Anda mempunyai laluan yang lebih jelas untuk perkembangan masa hadapan.',
      'Pencapaian anda boleh menjadi sumber kebanggaan peribadi dan keluarga.',
    ],
    disclaimer:
      'Setiap peserta mempunyai perjalanan dan hasil yang berbeza. Kelayakan akhir bergantung kepada pengalaman, bukti kompetensi, komitmen dan proses penilaian.',
  },
  urgency: {
    title: 'Semakan Profil Untuk Pengambilan Akan Datang Kini Dibuka',
    body: 'Setiap profil perlu disemak terlebih dahulu bagi menentukan kesesuaian laluan dan tahap kesiapsiagaan peserta. Lengkapkan semakan awal supaya team kami boleh membantu anda memahami langkah seterusnya.',
    cta: 'Mohon Semakan Awal Percuma',
    responsePromise: 'Team akan menghubungi anda melalui WhatsApp dalam tempoh satu hari bekerja.',
  },
  quick: {
    title: 'Semakan Kelayakan Percuma',
    subtitle: 'Hanya sekitar 60 saat. Tiada komitmen. Team akan menghubungi anda melalui WhatsApp.',
    qPathway: 'Laluan manakah yang menarik minat anda?',
    pathwayOptions: {
      keusahawanan: 'Keusahawanan',
      kepimpinan: 'Kepimpinan & Pentadbiran Organisasi',
      unsure: 'Belum pasti',
    },
    qYears: 'Berapa tahun pengalaman berkaitan anda?',
    yearsOptions: ['Kurang 3 tahun', '3–5 tahun', '6–10 tahun', 'Lebih 10 tahun'],
    qQualification: 'Kelayakan tertinggi',
    qualificationOptions: ['SPM', 'STPM / STAM', 'Sijil', 'Diploma', 'Lain-lain'],
    qName: 'Nama penuh',
    qPhone: 'Nombor WhatsApp',
    qLang: 'Bahasa pilihan',
    langOptions: ['BM', 'EN', '中文', 'Iban'],
    consent:
      'Saya bersetuju supaya Team SPM2Diploma menghubungi saya melalui WhatsApp berkaitan semakan awal ini. Maklumat saya akan dikendalikan menurut Notis Privasi.',
    submit: 'Hantar Untuk Semakan Percuma',
    submitting: 'Menghantar…',
    confirmTitle: 'Semakan Awal Anda Telah Diterima',
    confirmBody:
      'Team SPM2Diploma akan menyemak profil awal anda dan menghubungi anda melalui WhatsApp dalam tempoh satu hari bekerja.',
    statusPartial: 'Profil Awal Diterima — Belum Lengkap',
    statusComplete: 'Profil Lengkap Diterima',
    btnContinue: 'Teruskan Profil Lengkap',
    btnLater: 'Sambung Kemudian',
    btnWhatsapp: 'WhatsApp Team Sekarang',
    continueNote:
      'Melengkapkan profil penuh (5–8 minit) membantu team menyemak laluan anda dengan lebih tepat. Anda juga boleh melengkapkannya kemudian.',
  },
  outcomes: {
    title: 'Apa Yang Boleh Berubah Untuk Anda?',
    note: 'Setiap perjalanan berbeza. Hasil bergantung kepada latar belakang, komitmen dan proses penilaian.',
    items: [
      { title: 'Keyakinan profesional', body: 'Dapat mengukuhkan keyakinan diri dalam peranan anda.' },
      { title: 'Kredibiliti', body: 'Dapat menyokong kredibiliti anda di mata pelanggan dan rakan kongsi.' },
      { title: 'Kedudukan peribadi', body: 'Membantu memperbaiki kedudukan profesional anda.' },
      { title: 'Kepimpinan', body: 'Dapat mengukuhkan kedudukan kepimpinan dalam organisasi.' },
      { title: 'Laluan kelayakan', body: 'Menyediakan laluan kemajuan kelayakan secara formal.' },
      { title: 'Kemungkinan masa hadapan', body: 'Membuka kemungkinan baharu untuk masa hadapan anda.' },
      { title: 'Kebanggaan', body: 'Kebanggaan peribadi dan keluarga atas pencapaian anda.' },
    ],
  },
  coach: {
    title: 'You Bring the Experience. We Guide the Journey.',
    subtitle: 'Coach Roszie & Team SPM2Diploma',
    roles: ['Operating Partner', 'Lead Trainer', 'Pembimbing peserta'],
    teamNote: 'Team SPM2Diploma di bawah KOBIS Berhad',
    trust:
      'Coach Roszie and the SPM2Diploma Team under KOBIS Berhad will be together with you throughout this journey.',
    trustMs:
      'Anda tidak perlu melalui perjalanan ini seorang diri. Coach Roszie dan Team SPM2Diploma di bawah KOBIS Berhad akan membantu, membimbing dan bergerak bersama anda dari semakan awal sehingga anda bersedia menghadapi proses penilaian.',
    photoPlaceholder: 'Foto rasmi Coach Roszie',
    videoPlaceholder: 'Video pengenalan (akan dikemas kini)',
    teamCard: {
      title: 'Team SPM2Diploma di bawah KOBIS Berhad',
      body: 'Team program yang berdedikasi menyokong komunikasi peserta, kesiapsiagaan dokumen, penyelarasan latihan dan pemantauan kemajuan.',
    },
    whatsappCta: 'Hubungi Team di WhatsApp',
  },
  suitability: {
    title: 'Adakah Perjalanan Ini Untuk Anda?',
    statement:
      'Program ini bukan jalan pintas mendapatkan Diploma. Ia merupakan perjalanan dibimbing yang memerlukan pengalaman sebenar, komitmen dan proses penilaian.',
    items: [
      'Mempunyai pengalaman sebenar yang berkaitan',
      'Serius untuk memperoleh kelayakan lebih tinggi',
      'Bersedia menyediakan bukti pengalaman',
      'Boleh komited kepada bimbingan dan penilaian',
      'Sabar dengan proses yang betul',
      'Bersedia dari segi kewangan',
      'Mahukan bimbingan—bukan jalan pintas',
    ],
  },
  journey: {
    title: 'Perjalanan Anda Bersama Kami',
    intro: 'Lapan langkah yang jelas, dibimbing dari mula hingga akhir.',
    steps: [
      { title: 'Semak Kelayakan', body: 'Kongsikan pengalaman dan latar belakang anda.' },
      { title: 'Team Menyemak Profil Anda', body: 'Team program menilai kesesuaian laluan anda.' },
      { title: 'Bincang Laluan Yang Sesuai', body: 'Sesi perbincangan peribadi mengenai laluan anda.' },
      { title: 'Lengkapkan Pendaftaran', body: 'Selesaikan pendaftaran rasmi program.' },
      { title: 'Sertai Latihan & Bimbingan', body: 'Latihan dan bimbingan bersama team.' },
      { title: 'Sediakan Portfolio & Bukti', body: 'Bangunkan portfolio dengan bimbingan.' },
      { title: 'Bersedia Untuk Penilaian', body: 'Persediaan rapi menghadapi penilaian.' },
      { title: 'Lengkapkan Proses Penilaian', body: 'Jalani proses penilaian yang ditetapkan.' },
    ],
  },
  credibility: {
    title: 'Kredibiliti Program',
    intro:
      'Program ini berlandaskan sistem Kelayakan Kemahiran Malaysia. Ketahui lebih lanjut mengenai struktur rasmi di sebalik laluan ini.',
    items: [
      {
        q: 'Apakah Sistem Persijilan Kemahiran Malaysia?',
        a: 'Sistem Persijilan Kemahiran Malaysia diuruskan oleh Jabatan Pembangunan Kemahiran (JPK). Ia mengiktiraf kompetensi berasaskan standard pekerjaan kebangsaan.',
      },
      {
        q: 'Apakah NOSS?',
        a: 'NOSS (National Occupational Skills Standard) ialah standard kemahiran pekerjaan kebangsaan yang menjadi asas kepada setiap kelayakan kemahiran di Malaysia.',
      },
      {
        q: 'Apakah DKM Tahap 4?',
        a: 'Diploma Kemahiran Malaysia (DKM) Tahap 4 ialah kelayakan kemahiran peringkat diploma dalam sistem Kelayakan Kemahiran Malaysia.',
      },
      {
        q: 'Apakah DLKM Tahap 5?',
        a: 'Diploma Lanjutan Kemahiran Malaysia (DLKM) Tahap 5 ialah kelayakan kemahiran lanjutan, satu tahap lebih tinggi daripada DKM.',
      },
      {
        q: 'Bagaimana penilaian dijalankan?',
        a: 'Penilaian berasaskan kompetensi, termasuk portfolio dan bukti pengalaman sebenar, mengikut proses yang ditetapkan oleh keperluan rasmi program.',
      },
    ],
    disclaimer:
      'Maklumat rasmi program, nama kelayakan dan rujukan NOSS adalah tertakluk kepada pengesahan akhir.',
  },
  faq: {
    title: 'Soalan Lazim',
    items: [
      {
        q: 'Saya hanya ada SPM. Bolehkah saya memohon?',
        a: 'Pemegang SPM yang mempunyai pengalaman berkaitan dialu-alukan untuk menjalani semakan profil. Kelayakan akhir tertakluk kepada latar belakang, pengalaman, bukti kompetensi dan keperluan rasmi program.',
      },
      {
        q: 'Adakah pengalaman diperlukan?',
        a: 'Ya. Program ini direka khas untuk mereka yang mempunyai pengalaman sebenar dalam perniagaan atau kepimpinan organisasi. Pengalaman anda adalah asas kepada perjalanan ini.',
      },
      {
        q: 'Bolehkah saya terus bekerja atau menjalankan perniagaan?',
        a: 'Ya. Laluan ini direka untuk mereka yang masih bekerja, menjalankan perniagaan atau memegang tanggungjawab organisasi.',
      },
      {
        q: 'Berapa lama proses ini mengambil masa?',
        a: 'Program merangkumi latihan, bimbingan portfolio dan persediaan penilaian. Tempoh sebenar tertakluk kepada kesiapsiagaan peserta, keperluan portfolio dan jadual penilaian.',
      },
      {
        q: 'Adakah kelayakan ini diiktiraf?',
        a: 'Program ini berlandaskan sistem Kelayakan Kemahiran Malaysia di bawah JPK. Maklumat rasmi kelayakan akan disahkan dan dikongsikan semasa sesi penerangan. [Untuk pengesahan rasmi]',
      },
      {
        q: 'Apakah DKM dan DLKM?',
        a: 'DKM ialah Diploma Kemahiran Malaysia (Tahap 4) dan DLKM ialah Diploma Lanjutan Kemahiran Malaysia (Tahap 5) dalam sistem Kelayakan Kemahiran Malaysia.',
      },
      {
        q: 'Apakah NOSS?',
        a: 'NOSS (National Occupational Skills Standard) ialah standard kemahiran pekerjaan kebangsaan yang menjadi asas kelayakan kemahiran di Malaysia.',
      },
      {
        q: 'Adakah saya menerima Diploma secara automatik?',
        a: 'Tidak. Penyertaan program tidak menjamin pensijilan secara automatik. Peserta perlu melengkapkan keperluan program dan disahkan kompeten melalui proses penilaian yang ditetapkan.',
      },
      {
        q: 'Adakah penyediaan portfolio diperlukan?',
        a: 'Ya. Portfolio dan bukti pengalaman adalah sebahagian penting daripada proses penilaian. Team akan membimbing anda sepanjang penyediaan.',
      },
      {
        q: 'Apakah bukti yang mungkin diperlukan?',
        a: 'Antaranya: pendaftaran perniagaan atau organisasi, profil syarikat, laporan projek, minit mesyuarat, rekod kewangan atau operasi, bahan pemasaran, rekod kakitangan, gambar, video dan sijil berkaitan.',
      },
      {
        q: 'Berapakah yuran program?',
        a: 'Yuran bergantung pada laluan dan keperluan peserta. Maklumat lengkap mengenai yuran, jadual dan pilihan bayaran akan diterangkan selepas semakan profil awal. Tiada bayaran diperlukan untuk semakan awal.',
      },
      {
        q: 'Bolehkah bayaran dibuat secara berperingkat?',
        a: 'Maklumat mengenai struktur bayaran akan dikongsikan semasa sesi penerangan. [Untuk pengesahan rasmi]',
      },
      {
        q: 'Bolehkah saya mencari tajaan?',
        a: 'Anda boleh menyatakan hasrat mencari tajaan dalam borang semakan kelayakan. Team akan berbincang dengan anda mengenai pilihan yang ada.',
      },
      {
        q: 'Siapakah yang akan membimbing saya?',
        a: 'Coach Roszie dan Team SPM2Diploma di bawah KOBIS Berhad akan membantu, membimbing dan bergerak bersama anda dari semakan awal sehingga anda bersedia menghadapi proses penilaian.',
      },
      {
        q: 'Adakah kelas dijalankan secara fizikal, online atau hybrid?',
        a: 'Kaedah latihan dan bimbingan akan diterangkan semasa sesi penerangan mengikut laluan dan kumpulan pengambilan. [Untuk pengesahan rasmi]',
      },
      {
        q: 'Apakah yang berlaku selepas semakan kelayakan?',
        a: 'Team akan menyemak profil awal anda dan menghubungi anda melalui WhatsApp dalam tempoh satu hari bekerja untuk membincangkan laluan yang sesuai dan langkah seterusnya.',
      },
      {
        q: 'Siapakah badan yang mengeluarkan kelayakan?',
        a: 'Maklumat rasmi kelayakan, NOSS dan rakan penilaian sedang melalui proses pengesahan akhir. Maklumat yang disahkan akan diterangkan kepada pemohon semasa sesi semakan profil.',
      },
      {
        q: 'Apakah peranan KOBIS Berhad?',
        a: 'KOBIS Berhad menguruskan strategi program, pemasaran, penyelarasan pemohon, platform digital dan pentadbiran program. Coach Roszie dan team program mengendalikan bimbingan dan sokongan peserta.',
      },
      {
        q: 'Bagaimana data peribadi saya dikendalikan?',
        a: 'Maklumat anda disimpan dengan selamat, diakses hanya oleh team yang diberi kuasa, dan dikendalikan menurut Notis Privasi. Maklumat anda tidak dijual atau dikongsikan untuk tujuan pemasaran pihak ketiga.',
      },
    ],
  },
  finalCta: {
    headline1: 'Pengalaman Anda Sudah Membawa Anda Sejauh Ini.',
    headline2: 'Kini Bawa Ia Ke Tahap Seterusnya.',
    cta: 'Semak Kelayakan Saya',
    trust: 'Team SPM2Diploma di bawah KOBIS Berhad akan bersama anda sepanjang perjalanan ini.',
  },
  form: {
    title: 'Semakan Kelayakan SPM2Diploma',
    support:
      'Ceritakan sedikit tentang pengalaman anda. Team SPM2Diploma akan menyemak maklumat anda dan membantu menentukan laluan yang bersesuaian.',
    stepLabel: 'Langkah',
    of: 'daripada',
    next: 'Langkah Seterusnya',
    back: 'Kembali',
    submit: 'Hantar Semakan Kelayakan',
    submitting: 'Menghantar…',
    estTime: 'Anggaran masa: 5–8 minit',
    steps: {
      pathway: {
        title: 'Pilih Laluan Anda',
        options: {
          keusahawanan: 'Diploma Kemahiran Keusahawanan',
          kepimpinan: 'Diploma Lanjutan Kepimpinan & Pentadbiran Organisasi',
          unsure: 'Saya belum pasti',
        },
      },
      personal: {
        title: 'Maklumat Peribadi',
        fullName: 'Nama penuh',
        ageRange: 'Lingkungan umur',
        ageOptions: ['25–34', '35–44', '45–54', '55 dan ke atas'],
        location: 'Lokasi (bandar / negeri)',
        phone: 'Nombor WhatsApp',
        email: 'E-mel',
        qualification: 'Kelayakan tertinggi',
        qualificationOptions: ['SPM', 'STPM / STAM', 'Sijil', 'Diploma', 'Lain-lain'],
      },
      experience: {
        titleBusiness: 'Pengalaman Perniagaan Anda',
        titleLeadership: 'Pengalaman Kepimpinan Anda',
        titleUnsure: 'Pengalaman Anda',
        unsureNote: 'Kongsikan pengalaman yang paling berkaitan — perniagaan atau kepimpinan organisasi.',
        businessName: 'Nama perniagaan',
        industry: 'Industri',
        yearsBusiness: 'Bilangan tahun dalam perniagaan',
        currentRole: 'Peranan semasa',
        teamSize: 'Saiz pasukan',
        products: 'Produk / perkhidmatan utama',
        responsibilities: 'Tanggungjawab utama',
        website: 'Laman web / pautan sosial perniagaan (jika ada)',
        orgName: 'Nama organisasi',
        orgType: 'Jenis organisasi',
        orgTypeOptions: [
          'NGO',
          'Koperasi',
          'Persatuan',
          'Yayasan',
          'Organisasi komuniti',
          'Syarikat / korporat',
          'Perundingan',
          'Lain-lain',
        ],
        position: 'Jawatan semasa',
        yearsLeadership: 'Bilangan tahun dalam kepimpinan',
        orgTeamSize: 'Saiz pasukan / jawatankuasa / sukarelawan',
        orgResponsibilities: 'Tanggungjawab utama',
        orgWebsite: 'Laman web / pautan sosial organisasi (jika ada)',
        yearsOptions: ['1–2 tahun', '3–5 tahun', '6–10 tahun', 'Lebih 10 tahun'],
      },
      evidence: {
        title: 'Kesediaan Bukti',
        intro:
          'Antara berikut, yang manakah mungkin anda miliki? (Tandakan semua yang berkenaan — dokumen TIDAK perlu dimuat naik sekarang.)',
        note: 'Dokumen akan diminta kemudian melalui proses sokongan peserta yang biasa.',
        options: [
          'Pendaftaran perniagaan atau organisasi',
          'Profil syarikat / organisasi',
          'Laporan projek',
          'Minit mesyuarat',
          'Rekod kewangan atau operasi',
          'Bahan pemasaran',
          'Rekod kakitangan atau organisasi',
          'Gambar atau video',
          'Sijil berkaitan',
          'Bukti sokongan lain',
        ],
      },
      commitment: {
        title: 'Komitmen Anda',
        question:
          'Program ini memerlukan komitmen terhadap sesi bimbingan, penyediaan portfolio dan proses penilaian. Adakah anda bersedia memberikan komitmen yang diperlukan?',
        options: ['Ya, saya bersedia', 'Saya perlukan penerangan lanjut', 'Belum bersedia buat masa ini'],
      },
      financial: {
        title: 'Kesediaan Kewangan',
        question:
          'Sekiranya profil anda sesuai, adakah anda bersedia membuat pelaburan kewangan untuk mengikuti keseluruhan program?',
        options: [
          'Ya, saya bersedia',
          'Saya mahu melihat struktur bayaran terlebih dahulu',
          'Saya sedang mencari tajaan',
          'Belum bersedia dari segi kewangan',
        ],
      },
      motivation: {
        title: 'Motivasi Anda',
        question: 'Apakah sebab utama anda mahu mendapatkan Diploma?',
        options: [
          'Meningkatkan kelayakan',
          'Mengukuhkan keyakinan',
          'Kemajuan kerjaya',
          'Kredibiliti perniagaan',
          'Kepimpinan organisasi',
          'Peluang masa hadapan',
          'Kepuasan diri dan keluarga',
          'Lain-lain',
        ],
        otherLabel: 'Kongsikan lebih lanjut (pilihan)',
        otherPlaceholder: 'Ceritakan sebab anda…',
      },
    },
    consent: {
      title: 'Persetujuan',
      review: 'Saya bersetuju maklumat yang dihantar disemak oleh Team SPM2Diploma.',
      contact: 'Saya bersetuju dihubungi berkaitan program ini.',
      storage: 'Saya bersetuju maklumat saya disimpan dengan selamat.',
      privacy: 'Saya telah membaca dan menerima Notis Privasi.',
      privacyLink: 'Baca Notis Privasi',
    },
    validation: {
      required: 'Ruangan ini diperlukan',
      selectOne: 'Sila pilih satu pilihan',
      invalidEmail: 'Sila masukkan e-mel yang sah',
      invalidPhone: 'Sila masukkan nombor telefon yang sah',
      consentRequired: 'Persetujuan diperlukan untuk meneruskan',
      fixErrors: 'Sila lengkapkan ruangan yang bertanda sebelum meneruskan.',
    },
  },
  confirmation: {
    title: 'Terima kasih. Maklumat anda telah diterima.',
    support:
      'Coach Roszie dan Team SPM2Diploma di bawah KOBIS Berhad akan menyemak profil anda dan menghubungi anda untuk menerangkan langkah seterusnya.',
    refLabel: 'Rujukan permohonan',
    pathwayLabel: 'Laluan dipilih',
    dateLabel: 'Tarikh penghantaran',
    nextTitle: 'Apa yang berlaku seterusnya?',
    nextSteps: [
      'Team menyemak profil anda dalam masa beberapa hari bekerja.',
      'Anda akan dihubungi melalui WhatsApp atau telefon.',
      'Laluan yang sesuai akan dibincangkan bersama anda.',
    ],
    docsTitle: 'Dokumen yang dicadangkan untuk disediakan',
    docs: [
      'Salinan kad pengenalan',
      'Pendaftaran perniagaan / organisasi (jika ada)',
      'Contoh bukti pengalaman (laporan, gambar, rekod)',
    ],
    whatsappCta: 'Teruskan di WhatsApp',
    whatsappNote: 'Ada soalan segera? Hubungi terus Team SPM2Diploma.',
    unsurePathway: 'Belum pasti (akan dibincangkan)',
    backHome: 'Kembali ke Halaman Utama',
  },
  participant: {
    loginTitle: 'Log Masuk Peserta',
    loginSupport: 'Akses status permohonan, kemajuan dan senarai semak anda.',
    email: 'E-mel',
    password: 'Kata laluan',
    login: 'Log Masuk',
    loggingIn: 'Sedang log masuk…',
    loginError: 'E-mel atau kata laluan tidak sah.',
    logout: 'Log Keluar',
    welcome: 'Selamat datang',
    refLabel: 'Rujukan permohonan',
    pathwayLabel: 'Laluan anda',
    statusLabel: 'Status semasa',
    progressTitle: 'Kemajuan Perjalanan Anda',
    checklistTitle: 'Senarai Semak Anda',
    nextActionTitle: 'Tindakan Seterusnya',
    updatesTitle: 'Makluman Program',
    noUpdates: 'Tiada makluman baharu buat masa ini.',
    trainingLabel: 'Tarikh latihan',
    trainingTBA: 'Akan dimaklumkan',
    contactTitle: 'Hubungi Team Anda',
    whatsappSupport: 'Sokongan WhatsApp',
    stages: {
      application_received: 'Permohonan Diterima',
      profile_review: 'Semakan Profil',
      pathway_confirmation: 'Pengesahan Laluan',
      registration: 'Pendaftaran',
      training_guidance: 'Latihan & Bimbingan',
      portfolio_preparation: 'Penyediaan Portfolio',
      assessment_preparation: 'Persediaan Penilaian',
      completion: 'Selesai',
    },
    checklist: {
      personal_details: 'Maklumat peribadi lengkap',
      pathway_selected: 'Laluan dipilih',
      briefing_completed: 'Sesi penerangan program selesai',
      registration_completed: 'Pendaftaran selesai',
      documents_prepared: 'Dokumen diperlukan disediakan',
      training_attended: 'Latihan dihadiri',
      portfolio_in_progress: 'Portfolio sedang disediakan',
      ready_for_assessment: 'Bersedia untuk penilaian',
    },
  },
  footer: {
    publicTitle: 'SPM2Diploma',
    publicLinks: {
      pathways: 'Dua Laluan',
      journey: 'Perjalanan Anda',
      coach: 'Coach & Team',
      faq: 'Soalan Lazim',
      semak: 'Semak Kelayakan',
      contact: 'Hubungi Kami',
      privacy: 'Notis Privasi',
      programInfo: 'Maklumat Penting Program',
    },
    supportTitle: 'Sokongan Peserta',
    participantLogin: 'Log Masuk Peserta',
    whatsappSupport: 'Sokongan WhatsApp',
    internalTitle: 'Akses Dalaman',
    teamAccess: 'Team Access',
    managementAccess: 'Management Access',
    signature: 'SPM2Diploma is an initiative managed by KOBIS Berhad.',
    poweredBy: 'Powered and managed by',
    copyright: '© 2026 KOBIS Berhad. All Rights Reserved.',
  },
  floating: {
    whatsappLabel: 'WhatsApp Team SPM2Diploma',
    officerTitle: 'Pembantu Digital',
    online: 'Dalam talian · 24/7',
    greetingTitle: 'Ada soalan? Saya boleh bantu.',
    greetingBody: 'Jawapan segera tentang program.',
    officerIntro:
      'Salam! Saya boleh membantu menjawab soalan umum mengenai Program SPM2Diploma. Pilih soalan di bawah:',
    officerNote:
      'Untuk semakan kelayakan dan maklumat rasmi, Team SPM2Diploma akan membantu anda secara peribadi.',
    shortcuts: [
      {
        q: 'Adakah saya layak jika hanya mempunyai SPM?',
        a: 'Pemegang SPM yang mempunyai pengalaman berkaitan dialu-alukan untuk menjalani semakan profil. Kelayakan akhir tertakluk kepada latar belakang, pengalaman, bukti kompetensi dan keperluan rasmi program.',
      },
      {
        q: 'Laluan mana yang sesuai untuk saya?',
        a: 'Laluan Keusahawanan sesuai untuk pemilik dan pengurus perniagaan. Laluan Kepimpinan sesuai untuk pemimpin NGO, koperasi, persatuan dan pentadbir organisasi. Jika tidak pasti, hantar semakan awal dan team akan membantu menilai profil anda.',
      },
      {
        q: 'Berapa lama proses ini?',
        a: 'Tempoh sebenar tertakluk kepada kesiapsiagaan peserta, keperluan portfolio dan jadual penilaian. Team akan menerangkan anggaran semasa sesi semakan profil.',
      },
      {
        q: 'Apakah bukti pengalaman yang diperlukan?',
        a: 'Antaranya: pendaftaran perniagaan atau organisasi, profil syarikat, laporan projek, minit mesyuarat, rekod kewangan atau operasi, gambar dan sijil berkaitan. Dokumen tidak perlu dimuat naik semasa semakan awal.',
      },
      {
        q: 'Berapakah yuran program?',
        a: 'Yuran bergantung pada laluan dan keperluan peserta. Maklumat lengkap akan diterangkan selepas semakan profil awal. Tiada bayaran diperlukan untuk semakan awal.',
      },
      {
        q: 'Bolehkah saya terus bekerja?',
        a: 'Ya. Laluan ini direka untuk mereka yang masih bekerja, menjalankan perniagaan atau memegang tanggungjawab organisasi.',
      },
      {
        q: 'Apakah yang berlaku selepas saya menghantar semakan?',
        a: 'Team akan menyemak profil awal anda dan menghubungi anda melalui WhatsApp dalam tempoh satu hari bekerja untuk menerangkan langkah seterusnya.',
      },
    ],
    primaryCta: 'Mulakan Semakan Awal Percuma',
    askTeam: 'Tanya Team di WhatsApp',
  },
  privacy: {
    title: 'Notis Privasi',
    body: [
      'Maklumat yang anda hantar melalui borang Semakan Kelayakan digunakan untuk menyemak profil anda, menghubungi anda berkaitan program dan menguruskan penyertaan anda dalam Program SPM2Diploma.',
      'Maklumat anda disimpan dengan selamat dan hanya diakses oleh Team SPM2Diploma dan KOBIS Berhad yang diberi kuasa. Maklumat anda tidak akan dijual atau dikongsikan kepada pihak ketiga untuk tujuan pemasaran.',
      'Anda boleh menghubungi kami melalui WhatsApp untuk sebarang pertanyaan mengenai maklumat peribadi anda.',
      '[Notis privasi penuh akan dikemas kini — untuk pengesahan KOBIS Berhad]',
    ],
  },
  programInfo: {
    title: 'Maklumat Penting Program',
    body: [
      'Pemegang SPM yang mempunyai pengalaman berkaitan dialu-alukan untuk menjalani semakan profil. Kelayakan akhir tertakluk kepada latar belakang, pengalaman, bukti kompetensi dan keperluan rasmi program.',
      'Program merangkumi latihan, bimbingan portfolio dan persediaan penilaian. Tempoh sebenar tertakluk kepada kesiapsiagaan peserta, keperluan portfolio dan jadual penilaian.',
      'Penyertaan program tidak menjamin pensijilan secara automatik. Peserta perlu melengkapkan keperluan program dan disahkan kompeten melalui proses penilaian yang ditetapkan.',
      'Nama rasmi kelayakan dan rujukan NOSS adalah tertakluk kepada pengesahan akhir dan akan dikemas kini dari semasa ke semasa.',
    ],
  },
  seo: {
    home: {
      title: 'SPM2Diploma | Laluan Diploma Untuk Usahawan & Pemimpin Organisasi — KOBIS Berhad',
      desc: 'Laluan dibimbing untuk usahawan dan pemimpin organisasi membawa pengalaman sebenar ke arah kelayakan lebih tinggi. Semakan awal percuma dalam 60 saat.',
    },
    pathway1: {
      title: 'Laluan Keusahawanan | SPM2Diploma',
      desc: 'Laluan Diploma Kemahiran Keusahawanan untuk pemilik perniagaan, usahawan dan pengurus perniagaan berpengalaman.',
    },
    pathway2: {
      title: 'Laluan Kepimpinan & Pentadbiran Organisasi | SPM2Diploma',
      desc: 'Laluan Diploma Lanjutan Kepimpinan untuk pemimpin NGO, koperasi, persatuan dan pentadbir organisasi.',
    },
    semakan: {
      title: 'Semak Kelayakan Percuma | SPM2Diploma',
      desc: 'Semakan awal percuma dalam 60 saat. Team SPM2Diploma akan menghubungi anda melalui WhatsApp dalam tempoh satu hari bekerja.',
    },
    login: { title: 'Log Masuk Peserta | SPM2Diploma', desc: 'Akses status permohonan, kemajuan dan senarai semak anda.' },
    privacy: { title: 'Notis Privasi | SPM2Diploma', desc: 'Bagaimana maklumat peribadi anda dikendalikan oleh SPM2Diploma dan KOBIS Berhad.' },
    programInfo: { title: 'Maklumat Penting Program | SPM2Diploma', desc: 'Maklumat penting mengenai proses, penilaian dan pensijilan Program SPM2Diploma.' },
  },
  notFound: {
    title: 'Halaman Tidak Dijumpai',
    body: 'Halaman yang anda cari tidak wujud atau telah dipindahkan.',
    cta: 'Kembali ke Halaman Utama',
  },
  common: {
    loading: 'Memuatkan…',
    error: 'Maaf, berlaku ralat. Sila cuba lagi.',
    pendingConfirmation: 'Untuk pengesahan rasmi',
    demoNotice: 'Mod demo — data tidak disimpan secara kekal.',
  },
  /* ── V2+ LAUNCH EDITION — new homepage copy (contained namespace) ── */
  home2: {
    ctaPrimary: 'Semak Kelayakan Percuma',
    ctaWhatsapp: 'WhatsApp Advisor',
    audiences: {
      label: 'SIAPA YANG SESUAI',
      title: 'Dibina Untuk Mereka Yang Sudah Berpengalaman',
      intro:
        'Jika anda sudah membina pengalaman sebenar dalam salah satu bidang ini, laluan ini mungkin untuk anda.',
      cards: [
        {
          icon: '🏪',
          title: 'Usahawan & Pemilik SME',
          body: 'Anda telah menguruskan perniagaan, jualan, pelanggan, kewangan, pekerja dan operasi.',
        },
        {
          icon: '🤝',
          title: 'Pemimpin NGO / Koperasi / Persatuan',
          body: 'Anda berpengalaman dalam kepimpinan, tadbir urus, program dan pengurusan organisasi.',
        },
        {
          icon: '💼',
          title: 'Eksekutif & Operasi',
          body: 'Anda mengendalikan operasi, pentadbiran, projek, pelanggan, pasukan dan dokumentasi.',
        },
        {
          icon: '📈',
          title: 'Pengurus & Pewaris Perniagaan',
          body: 'Anda memikul tanggungjawab pengurusan syarikat, pekerja, kepimpinan dan pertumbuhan.',
        },
      ],
    },
    value: {
      label: 'PENGALAMAN ANDA BERNILAI',
      title: 'Pengalaman Anda Sudah Bernilai. Sekarang, Lihat Sejauh Mana Ia Boleh Membawa Anda.',
      body: 'Anda mungkin sudah bertahun-tahun membina perniagaan, memimpin organisasi atau menguruskan operasi. Terokai sama ada terdapat laluan kemajuan kelayakan yang berstruktur dan bersesuaian untuk anda.',
    },
    how: {
      title: 'Bagaimana Ia Berfungsi',
      intro: 'Enam langkah mudah — jelas dari awal hingga akhir.',
      steps: [
        { title: 'Semak Kelayakan', body: 'Kongsi pengalaman anda melalui borang ringkas percuma.' },
        { title: 'Konsultasi', body: 'Advisor menghubungi anda untuk memahami latar belakang dan matlamat.' },
        {
          title: 'Semakan / Saringan',
          body: 'Pengalaman dan dokumen disemak. Calon yang berpotensi mungkin melalui saringan atau temu bual ringkas.',
        },
        { title: 'Pengesahan', body: 'Laluan yang sesuai dan tawaran bertulis dikongsikan dengan anda.' },
        { title: 'Program', body: 'Anda memulakan perjalanan program secara berstruktur.' },
        { title: 'Bimbingan & Sokongan', body: 'Bengkel, coaching dan mentoring sepanjang perjalanan.' },
      ],
    },
    get: {
      title: 'Apa Yang Anda Dapat',
      intro: 'Lebih daripada sekadar laluan kelayakan — sebuah perjalanan yang dibimbing.',
      items: {
        pathway: { icon: '🧭', title: 'Laluan Berstruktur', body: 'Laluan kemajuan kelayakan yang tersusun berdasarkan pengalaman anda.' },
        workshop: { icon: '🏫', title: 'Bengkel Bersemuka', body: 'Sesi bengkel fizikal untuk memperkukuh pembelajaran dan penyediaan.' },
        groupCoaching: { icon: '👥', title: 'Coaching Kumpulan Online', body: 'Sesi bimbingan berkumpulan secara dalam talian.' },
        personalCoaching: { icon: '🎯', title: 'Coaching 1-ke-1', body: 'Bimbingan peribadi mengikut keperluan dan kemajuan anda.' },
        mentoring: { icon: '🧠', title: 'Mentoring Berterusan', body: 'Sokongan mentor sepanjang perjalanan — bukan sekadar pendaftaran program.' },
        support: { icon: '💬', title: 'Sokongan Peserta', body: 'Bantuan melalui team program dan saluran WhatsApp rasmi.' },
        progress: { icon: '📊', title: 'Panduan Kemajuan', body: 'Portal peserta dengan checklist dan pemantauan kemajuan anda.' },
      },
    },
    progression: {
      title: 'Laluan Kemajuan Anda',
      intro: 'Mudah dan jelas — daripada pengalaman kepada kelayakan.',
      steps: [
        'SPM / Pengalaman',
        'Semakan Kelayakan',
        'Laluan Kemahiran Profesional Yang Sesuai',
        'Kemungkinan Kemajuan Lanjutan',
      ],
      note: 'Maklumat rasmi kelayakan (termasuk tahap seperti DKM Tahap 4 / DLKM Tahap 5), NOSS dan badan persijilan akan disahkan dan diterangkan semasa sesi semakan profil.',
    },
    faqTitle: 'Soalan Lazim',
    faq: [
      {
        q: 'Saya hanya ada SPM. Bolehkah saya layak?',
        a: 'Pemegang SPM yang mempunyai pengalaman berkaitan dialu-alukan untuk menjalani semakan profil. Kelayakan akhir tertakluk kepada latar belakang, pengalaman, bukti kompetensi dan keperluan rasmi program.',
      },
      {
        q: 'Pengalaman apa yang relevan?',
        a: 'Pengalaman sebenar dalam perniagaan, kepimpinan organisasi, operasi atau pengurusan. Pengalaman anda adalah asas kepada laluan ini.',
      },
      {
        q: 'Adakah terdapat saringan atau temu bual?',
        a: 'Ya. Bagi memastikan kesesuaian, calon yang berpotensi mungkin melalui proses saringan atau temu bual ringkas secara dalam talian. Ini membantu team memahami pengalaman anda dan memastikan laluan yang betul.',
      },
      {
        q: 'Dokumen apa yang diperlukan?',
        a: 'Antaranya: pendaftaran perniagaan atau organisasi, profil syarikat, laporan projek, rekod kewangan atau operasi, gambar dan sijil berkaitan. Dokumen tidak perlu dimuat naik semasa semakan awal.',
      },
      {
        q: 'Bagaimana proses pembayaran?',
        a: 'Pembayaran boleh dibincangkan secara fleksibel, termasuk kemungkinan bayaran secara berperingkat. Maklumat penuh mengenai yuran dan struktur bayaran akan diterangkan oleh advisor selepas semakan kelayakan. Tiada bayaran diperlukan untuk semakan awal. [Untuk pengesahan rasmi]',
      },
      {
        q: 'Kelas online atau bersemuka?',
        a: 'Perjalanan program mungkin merangkumi bengkel bersemuka, coaching kumpulan dalam talian dan bimbingan peribadi. Kaedah sebenar akan diterangkan mengikut laluan dan kumpulan pengambilan. [Untuk pengesahan rasmi]',
      },
      {
        q: 'Bolehkah saya terus bekerja atau menjalankan perniagaan?',
        a: 'Ya. Laluan ini direka untuk mereka yang masih bekerja, menjalankan perniagaan atau memegang tanggungjawab organisasi.',
      },
      {
        q: 'Apa yang berlaku selepas semakan kelayakan?',
        a: 'Team akan menyemak profil awal anda dan menghubungi anda melalui WhatsApp dalam tempoh satu hari bekerja untuk membincangkan laluan yang sesuai dan langkah seterusnya.',
      },
    ],
    cohort: {
      label: 'ORGANISASI & KOHORT',
      title: 'Untuk Koperasi, NGO, Persatuan & Majikan',
      body: 'Ingin membawa laluan ini kepada ahli, pekerja atau komuniti anda? Kami boleh berbincang mengenai kerjasama kohort untuk organisasi.',
      cta: 'Bincang Cohort / Kerjasama Organisasi',
    },
  },
}
