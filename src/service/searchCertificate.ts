import sanitize from "./sanitize";


type Certificate = {
  name: string;
  type: string;
  or: string;
  date: Date;
  zone: string;
};

export default function searchCertificate(
  term: string,
  data: Certificate[]
): Certificate[] {
  const sanitized = sanitize(term);
  const pattern = new RegExp(sanitized, "i");

  return data.filter(
    (item) =>
      pattern.test(item.name) ||
      pattern.test(item.type) ||
      pattern.test(item.or)
  );
}
