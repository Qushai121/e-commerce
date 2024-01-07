function formatRupiah(number: number) {
    // Check if the input is a valid number
    if (isNaN(number)) {
        return "Invalid input";
    }

    // Convert the number to IDR format
    const formattedRupiah = number.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return formattedRupiah;
}

export default formatRupiah;