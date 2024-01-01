import { CardTitle } from "~/@/components/ui/card";

type NameProps = {
  name: string;
};

export default function ProductName({ name }: NameProps) {
  return (
    <CardTitle>
      <span className="">{name}</span>
    </CardTitle>
  );
}
