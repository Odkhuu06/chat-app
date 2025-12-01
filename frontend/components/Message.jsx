

export default function Message({ message, me }) {
  const isMe = message.senderId === me.id;

  return (
    <div className={`flex mb-2 ${isMe ? "justify-end" : "justify-start"}`}>
      <div className={`p-2 rounded-lg max-w-xs ${isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
        {message.text && <p>{message.text}</p>}
        {message.image && <img src={message.image} alt="img" className="mt-1 max-w-full rounded" />}
      </div>
    </div>
  );
}
