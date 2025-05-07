"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const constants_1 = require("./constants");
const MemeList = () => {
    const [memes, setMemes] = (0, react_1.useState)([]);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [pdfBlobUrl, setPdfBlobUrl] = (0, react_1.useState)(null);
    const [dates, setDates] = (0, react_1.useState)([]);
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [isGeneratingPDF, setIsGeneratingPDF] = (0, react_1.useState)(false);
    const [isSendingToTelegram, setIsSendingToTelegram] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchMemes = async () => {
            setLoading(true);
            try {
                const memeResponse = await axios_1.default.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reddit/memes${selectedDate ? `?date=${selectedDate}` : ""}`);
                setMemes(memeResponse.data);
                const uniqueDatesResponse = await axios_1.default.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reddit/memes/dates`);
                console.log(uniqueDatesResponse.data);
                setDates(uniqueDatesResponse.data);
                if (!selectedDate && uniqueDatesResponse.data.length > 0) {
                    setSelectedDate(uniqueDatesResponse.data[0]);
                }
            }
            catch (error) {
                console.error("Error fetching memes:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMemes();
    }, [selectedDate]);
    const handleGeneratePDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reddit/memes/pdf?date=${selectedDate}`, { responseType: "blob" });
            const blob = new Blob([response.data], { type: "application/pdf" });
            const blobUrl = URL.createObjectURL(blob);
            setPdfBlobUrl(blobUrl);
            setShowModal(true);
            react_toastify_1.toast.success("PDF generated successfully!");
        }
        catch (error) {
            console.error("Error generating PDF:", error);
            react_toastify_1.toast.error("Failed to generate PDF!");
        }
        finally {
            setIsGeneratingPDF(false);
        }
    };
    const handleSendToTelegram = async () => {
        setIsSendingToTelegram(true);
        try {
            await axios_1.default.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reddit/memes/pdf/chatbot`, { app: "telegram", date: selectedDate });
            setShowModal(false);
            react_toastify_1.toast.success("All memes sent to Telegram!");
        }
        catch (error) {
            console.error("Error sending memes to Telegram:", error);
            react_toastify_1.toast.error("Failed to send memes to Telegram!");
        }
        finally {
            setIsSendingToTelegram(false);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setPdfBlobUrl(null);
    };
    const handleMemeRedirect = (url) => {
        window.open(url, "_blank");
    };
    return (<div className="p-6">
      <react_toastify_1.ToastContainer position="bottom-center"/>
      <h1 className="text-3xl font-bold mb-6">
        {constants_1.UI_STRINGS.text.title} - {selectedDate}
      </h1>
      <div className="flex space-x-4 mb-6">
        <select value={selectedDate || ""} onChange={(e) => setSelectedDate(e.target.value)} className="border border-gray-300 rounded px-4 py-2">
          {dates.map((date) => (<option key={date} value={date}>
              {date}
            </option>))}
        </select>
        <button onClick={handleGeneratePDF} disabled={isGeneratingPDF} className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center ${isGeneratingPDF ? "opacity-50 cursor-not-allowed" : ""}`}>
          {isGeneratingPDF ? (<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>) : null}
          {constants_1.UI_STRINGS.buttons.generatePdf}
        </button>
      </div>
      {loading ? (<div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>) : (<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme, index) => (<li key={meme._id} className="border rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => handleMemeRedirect(meme.url)}>
              <h3 className="text-lg font-semibold mb-2">
                {index + 1}. {meme.title}
              </h3>
              <img src={meme.images?.[0].source.url} alt={meme.title} className="max-w-full h-auto mb-4 rounded"/>
              <p className="text-xl text-gray-700 mb-2">Votes: {meme.score}</p>
            </li>))}
        </ul>)}

      {showModal && pdfBlobUrl && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[80%] h-[80%]">
            <h2 className="text-xl font-bold mb-4">
              {constants_1.UI_STRINGS.text.pdfPreview}
            </h2>
            <iframe src={pdfBlobUrl} className="w-full h-[80%] border rounded mb-4" title={constants_1.UI_STRINGS.text.pdfPreview}></iframe>
            <div className="flex space-x-4">
              <button onClick={handleSendToTelegram} disabled={isSendingToTelegram} className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center ${isSendingToTelegram ? "opacity-50 cursor-not-allowed" : ""}`}>
                {isSendingToTelegram ? (<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>) : null}
                {constants_1.UI_STRINGS.buttons.sendToTelegram}
              </button>
              <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                {constants_1.UI_STRINGS.buttons.close}
              </button>
            </div>
          </div>
        </div>)}
    </div>);
};
exports.default = MemeList;
