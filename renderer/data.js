//@flow

interface InputData {
    title: string;
    date: string;
    tags: string;
}

export interface Tag {
    tag: string;
    extra?: string;
}

export interface Data {
    title: string;
    date: Date;
    tags: Tag[];
}

export default ({ title, date, tags }: InputData): Data => {
    const newDate = new Date(date);
    if (isNaN(newDate)) {
        throw new Error("Invalid Date");
    }

    return {
        title,
        date: newDate,
        tags: tags.split(/,/).map(t => {
            const parts = t.trim().split(":");
            if (parts.length === 1) {
                return { tag: parts[0] };
            } else {
                return { tag: parts[0], extra: parts[1] };
            }
        }),
    };
};
