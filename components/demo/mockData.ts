export type InvoiceStatus = "accepted" | "pending" | "rejected";

export type OutboxInvoice = {
  id: string;
  name: string;
  amount: string;
  date: string;
  details: {
    customer: string;
    isoDate: string;
    vkn: string;
    matrah: string;
    kdv: string;
    brut: string;
    ettn: string;
  };
};

export type InboxInvoice = {
  id: string;
  name: string;
  amount: string;
  date: string;
  status: InvoiceStatus;
  details: {
    sender: string;
    isoDate: string;
    vkn: string;
    matrah: string;
    kdv: string;
    brut: string;
    ettn: string;
  };
};

export const OUTBOX: OutboxInvoice[] = [
  {
    id: "AMA2026000000236",
    name: "Ferhat Kiyatmaz",
    amount: "14.400,00 ₺",
    date: "02/07/2026",
    details: {
      customer: "Ferhat Kiyatmaz",
      isoDate: "2026-07-02",
      vkn: "18472910356",
      matrah: "12.000,00 TRY",
      kdv: "2.400,00 TRY",
      brut: "14.400,00 TRY",
      ettn: "b8c4e1f2-9a3d-4c7e-8f01-2d5a6b7c8e9f",
    },
  },
  {
    id: "AMA2026000000235",
    name: "Battiste Tekstil Ltd.",
    amount: "1.011,20 ₺",
    date: "02/07/2026",
    details: {
      customer: "Battiste Tekstil Ltd. Şti.",
      isoDate: "2026-07-02",
      vkn: "5220005019",
      matrah: "1.011,20 TRY",
      kdv: "0,00 TRY",
      brut: "1.011,20 TRY",
      ettn: "6716630d-a12f-4c8e-9b01-8f3e2d4a5567",
    },
  },
  {
    id: "AMA2026000000234",
    name: "Yılmaz İnşaat Ltd.",
    amount: "12.000,00 ₺",
    date: "01/07/2026",
    details: {
      customer: "Yılmaz İnşaat Ltd. Şti.",
      isoDate: "2026-07-01",
      vkn: "6987451230",
      matrah: "10.000,00 TRY",
      kdv: "2.000,00 TRY",
      brut: "12.000,00 TRY",
      ettn: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    },
  },
];

export const INBOX_SEED: InboxInvoice[] = [
  {
    id: "NVT2026000000228",
    name: "Nova Dijital Ticaret A.Ş.",
    amount: "5.330,60 ₺",
    date: "11/07/2026",
    status: "accepted",
    details: {
      sender: "Nova Dijital Ticaret Anonim Şirketi",
      isoDate: "2026-07-11",
      vkn: "1234567890",
      matrah: "4.442,17 TRY",
      kdv: "888,43 TRY",
      brut: "5.330,60 TRY",
      ettn: "c2d3e4f5-a6b7-8901-cdef-234567890abc",
    },
  },
  {
    id: "AYZ2026000000230",
    name: "Anadolu Yazılım Ltd. Şti.",
    amount: "6,40 ₺",
    date: "11/07/2026",
    status: "pending",
    details: {
      sender: "Anadolu Yazılım Limited Şirketi",
      isoDate: "2026-07-11",
      vkn: "4598213670",
      matrah: "5,33 USD",
      kdv: "1,07 USD",
      brut: "6,40 USD",
      ettn: "35e5d9d2-a54f-408f-9605-3d84e40b5618",
    },
  },
  {
    id: "AKS2026000001874",
    name: "Aksa Enerji A.Ş.",
    amount: "3.240,00 ₺",
    date: "10/07/2026",
    status: "pending",
    details: {
      sender: "Aksa Enerji Anonim Şirketi",
      isoDate: "2026-07-10",
      vkn: "6080408039",
      matrah: "2.700,00 TRY",
      kdv: "540,00 TRY",
      brut: "3.240,00 TRY",
      ettn: "7c91e2a0-4b3d-4f1e-9a2c-8d5e6f7a8b9c",
    },
  },
  {
    id: "ELO2026000000231",
    name: "Ege Lojistik A.Ş.",
    amount: "300,00 ₺",
    date: "09/07/2026",
    status: "rejected",
    details: {
      sender: "Ege Lojistik Anonim Şirketi",
      isoDate: "2026-07-09",
      vkn: "3312456789",
      matrah: "250,00 TRY",
      kdv: "50,00 TRY",
      brut: "300,00 TRY",
      ettn: "9f0e1d2c-3b4a-5968-7e6d-5c4b3a291807",
    },
  },
];

/** sceneIdx maps to ChatDemo SCENES order */
export const CHATS: { title: string; date: string; sceneIdx: number }[] = [
  { title: "Geçen ayın faturalarını Excel'e dök", date: "7 Tem 2026", sceneIdx: 3 },
  { title: "Yılmaz İnşaat'a 10.000 TL + KDV", date: "6 Tem 2026", sceneIdx: 0 },
  { title: "Bu ay kestiğim faturaları göster", date: "5 Tem 2026", sceneIdx: 1 },
];

export const PROFILE = {
  company: "Nova Dijital Ticaret A.Ş.",
  short: "Nova Dijital Tic...",
  initial: "N",
  vkn: "1234567890",
  phone: "0532 421 08 16",
  plan: "e-Fatura + e-Arşiv",
};

export const STATUS_LABEL: Record<InvoiceStatus, string> = {
  accepted: "Kabul",
  pending: "Yanıt Bekleniyor",
  rejected: "Red",
};

export const STATUS_CLASS: Record<InvoiceStatus, string> = {
  accepted: "bg-signal-soft text-signal-dark",
  pending: "bg-amber-soft text-amber",
  rejected: "bg-red-soft text-red",
};
