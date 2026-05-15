import { AppTitleHeader } from "@/components/layout/AppTitleHeader"

export default function Placeholder({ title }: { title: string }) {
  return (
    <>
      <AppTitleHeader />
      <main className="px-8 py-16">
        <div className="rounded-xl border border-dashed border-navy-100 p-12 text-center">
          <h2 className="font-display text-xl font-semibold text-navy-800">{title}</h2>
          <p className="mt-2 text-sm text-navy-500">Not designed yet — coming in a later iteration.</p>
        </div>
      </main>
    </>
  )
}
