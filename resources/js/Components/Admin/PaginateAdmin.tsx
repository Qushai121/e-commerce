import { Link } from "@inertiajs/react";
import { Key } from "react";

type PaginateAdminProps = {
    data: any
}

export default function PaginateAdmin({ data }: PaginateAdminProps) {
    const {
        first_page_url,
        from,
        last_page,
        last_page_url,
        links,
        next_page_url,
        path,
        per_page,
        prev_page_url,
        to,
        total,
    } = data;

    if (data.data.length == 0) {
        return <></>;
    }
    return (
        <>
            <div className="flex items-center justify-between border-t mt-6 border-gray-200 bg-gray-100 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <Link
                        href={prev_page_url}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </Link>
                    <Link
                        href={next_page_url}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </Link>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{from}</span>{" "}
                            to <span className="font-medium">{to}</span> of{" "}
                            <span className="font-medium">{total}</span> results
                        </p>
                    </div>
                    <div>
                        <nav
                            className="isolate flex gap-3 -space-x-px rounded-md shadow-sm"
                            aria-label="Pagination"
                        >
                            

                            {links.map((link: { url: string | undefined; label: string; }, key: Key | null | undefined) => {
                                return (
                                    <Link
                                        key={key}
                                        href={link.url as string}
                                        className={`relative ${!link.url ? "hidden" : ""
                                            } ${link.url == window.location.href ? 'bg-blue-400 ' : 'bg-stone-500'}
                                        z-10 inline-flex items-center bg-blueMain rounded-md px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        {link.label.split(" ")[0] == "&laquo;"
                                            ? "Prev"
                                            : link.label.split(" ")[0]}
                                    </Link>
                                );
                            })}
                           
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}