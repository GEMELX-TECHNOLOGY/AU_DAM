function Header({ title, text }: { title: string; text: string }) {
  return (
    <div className="w-full h-[100px]">
      <div className="p-5">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="font-light text-sm">{text}</p>
      </div>
    </div>
  );
}

export default Header;
