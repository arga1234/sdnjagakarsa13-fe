export interface IRawSoal {
  nomorSoal: number;
  pertanyaanText: string;
  pertanyaanImage?: string; // single image
  pilihanJawabanText?: string[];
  pilihanJawabanImage?: string[];
}

export function parseRaw(text: string): IRawSoal[] {
  const soalBlocks = text.split(/^\s*(\d+)\.\s/m).slice(1);

  const soals: IRawSoal[] = [];
  for (let i = 0; i < soalBlocks.length; i += 2) {
    const nomor = parseInt(soalBlocks[i], 10);
    const body = soalBlocks[i + 1].trim();

    const [qPart, oPart] = body.split(/^\s*a\.\s/m);

    // --- Pertanyaan ---
    // cari first tag gambar [img:...]
    const imgTag = qPart.match(/\[img:(.+?)\]/);
    const pertImg = imgTag ? imgTag[1].trim() : undefined;
    const pertText = qPart.replace(/\[img:.+?\]/, '').trim();

    // --- Pilihan Jawaban ---
    const optsRaw = 'a.' + oPart;
    const parts = optsRaw
      .split(/(?:^|\s)([abc]\.)\s*/)
      .filter((s) => s && !/^[abc]\.$/.test(s));

    // deteksi semua opsi image?
    const allImg = parts.every((opt) => /^\[img:.+?\]/.test(opt));
    const pilihanText: string[] = [];
    const pilihanImg: string[] = [];

    parts.forEach((opt) => {
      const m = opt.match(/^\[img:(.+?)\]/);
      if (m) pilihanImg.push(m[1].trim());
      else pilihanText.push(opt.trim());
    });

    soals.push({
      nomorSoal: nomor,
      pertanyaanText: pertText,
      pertanyaanImage: pertImg,
      pilihanJawabanText: allImg ? undefined : pilihanText,
      pilihanJawabanImage: allImg ? pilihanImg : undefined,
    });
  }

  return soals;
}
