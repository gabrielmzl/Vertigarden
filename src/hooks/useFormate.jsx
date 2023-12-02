import { AlertTriangle } from "lucide-react";

export default function useFormate() {
    const formatDate = (date) => {
        const inputDate = new Date(date);

        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };

        const formattedDate = inputDate.toLocaleDateString("pt-br", options);
        const formattedTime = inputDate.toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" });

        const outputString = formattedDate + ' às ' + formattedTime;

        return outputString;
    }

    const formatCpfCnpj = (value) => {
        const number = value.replace(/\D/g, '');

        if (number.length === 11) {
            return number.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (number.length === 14) {
            return number.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        } else {
            return <div className="flex items-center gap-2 text-[#EF4E4E]"><AlertTriangle size={32} color="#EF4E4E" strokeWidth={1.5} /> Este cliente não tem documento</div>;
        }
    }

    return {
        formatDate,
        formatCpfCnpj
    };
}
