import Button from "../components/Button";
import PdfDocument from "../components/PdfDocument";
import { usePDF } from "@react-pdf/renderer";

const TestPDF: React.FC = () => {
  const [instance, setInstance] = usePDF({ document: <PdfDocument /> });
  const download = () => {
    const a = document.createElement("a");
    a.href = instance.url || "";
    a.download = 'test.pdf'
    document.body.append(a)
    a.click();
    document.body.removeChild(a)
  };
  return <Button onClick={download}>Download</Button>;
};

export default TestPDF;
