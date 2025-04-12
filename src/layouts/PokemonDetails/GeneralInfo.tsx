type Props = {
  imgUrl: string;
  spriteUrl: string;
  name: string;
};

function GeneralInfo({ imgUrl, spriteUrl, name }: Props) {
  return (
    <section>
      <div className="flex justify-center items-center">
        <img src={imgUrl} alt={name} />
      </div>
      <div className={"relative mt-10"}>
        <p className="font-bold text-4xl capitalize">{name}</p>
        <div className="absolute top-[-40px] right-[-30px]">
          <img src={spriteUrl} alt={name} className="w-28" />
        </div>
      </div>
    </section>
  );
}

export default GeneralInfo;
