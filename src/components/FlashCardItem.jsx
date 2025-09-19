export default function FlashcardItem({ study }) {
  return (
    <div className="bg-gray-800 p-4 rounded flex justify-between">
      <div>
        <h4 className="font-bold">{study.title}</h4>
        <p className="text-sm text-gray-400">
          {study.terms.length} thuật ngữ • Tác giả: {study.author || "Bạn"}
        </p>
      </div>
      <button className="text-gray-400">...</button>
    </div>
  );
}
