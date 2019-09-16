export const formatDate = (date) => {
    const newDate = new Date(date);
    if(newDate){
        const months=[
            '','Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
            'Agu', 'Sep', 'Okt', 'Nov', 'Des'
        ];
        const thisDate = newDate.getDate();
        const thisMonth = months[newDate.getMonth()];
        const thisYear = newDate.getFullYear();
        return `${thisDate} ${thisMonth} ${thisYear}`;
    }
    return date;
}