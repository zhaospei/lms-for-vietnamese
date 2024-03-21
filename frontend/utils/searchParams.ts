import { useSearchParams } from 'next/navigation';
export function getParam<T, R extends string = string>(key: keyof T, params: ReturnType<typeof useSearchParams>): R | undefined {
    let res = params.get(key as string);
    return res !== null ? res as R : undefined;
}

export function slugToName<Slug extends string, Name extends string>(
    record: Record<Slug, Name>,
    slug: Slug,
): Name {
    return record[slug];
}

export function nameToSlug<Slug extends string, Name extends string>(
    record: Record<Slug, Name>,
    name: Name
): Slug | undefined {
    for (const slug in record)
        if (record[slug] === name)
            return slug;
    return undefined;
}
