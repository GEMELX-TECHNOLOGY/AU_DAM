import { IconBellRinging2, IconChevronDown } from "@tabler/icons-react";

export const Header = ({
  title,
  description,
  name,
}: {
  title: string;
  description: string;
  name: string;
}) => {
  return (
    <div className="w-full h-[100px]">
      <div className="flex flex-row justify-between">
        <div className="p-5">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="font-light text-sm">{description}</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <IconBellRinging2 />
          <div className="hidden lg:flex flex-row items-center gap-4">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALMAAACUCAMAAADvY+hPAAAANlBMVEXm5uampqasrKzi4uKjo6Pp6emgoKCvr6/f39+pqana2trX19fU1NTGxsazs7PR0dG5ubnAwMB/tXrTAAADo0lEQVR4nO2b2barIAxAHYiiFrX//7MX23pqZyET3sV+at/2ygoQSCyKTCaTyWQymUwmk8lkMkcCPI8/0sZb2snNY1tVVTvObrLJe/duNE1jypXlz+h6ba2P+ADP5cb37l3OPtzaem+Awof4Vfim7YNdpGYN4Kryk/HFuqxcWokNQ9t8Eb7StEM60lC7j1nxmCGuTsQa7LzH+GI9p7EWoe/2Knvprk9AGk6/M3lLc1KXhlOQ8YK2NAxdsHOnvH3YgFxeMZ1VdY5QXqQVjWH3JvckPatlB0xRxguTlrRt48LsA90qpTScw3bmLc1ZJdDQx0b5EmmV8zB2Ad6cNZYh1BhlL61Q4sGMUi5LhUDbCulciW8diL15RX6PPuPS2Sf0WVo5/jz5cxY/V8LL5ldOssrgsGH2gXayCQ3odF4SWngRotN5SWhZ5RptvFCLOlt8mH2gZTeOPr4MvdPIvvEOJM7DAZ1lN+jAx6MknI+YG0dcg0fc6454phQVwdldySrjLt03Z+Eb4RFr0WIicJ5klfHXbo2LNzqhzSytXDh0nJ20MvToNxn5V0bsbqfxyAgD0lmjewUj6i13VHl/RtXQWu1YRKDNqGLsi+jwHuxKpzWiFF90iJcad+rI7DCjcOW8xcYtw0az4R23SatszRvpmBaFWuN4JXgdGvHa6AVwgbM9elvGVvrrMOBTkMsUlJdDfPcDumm1h5FWoJ/35UczpzCptrJnkNEksPoeOP2uPTrh3tpXwE67DnEzpjIGDda1u0Zcl+xoXQLWAK7baXy17rTHoMHncWiZ1Pi8VrQGew6I8T3WZ70EgSmyG2tarTIp6NB+klY6wusRde9u5a8q0CO79KaVPsdhQDcnTCV7XYEeKXxFMtJA0tJcmppi0jED8e+RG5PHz3ytyM1+kSmLzffAzkvJPhqJp3OKzuAWgac7uvW3IrAOCZrGj7D33EJfYPbA/EoDJHMbzxjWcppinOCNM+feAQSd+bfSjFeA2Hf9n86M7/74efhPsI1F1CzZvGBmrkAju8VfpZlG7Xg2jZsz19ZBf5zcaViMYWJ1ZtnucHMEv+CZM6C5tn6GoQNOXTc/w1JHM+4aF2eGkpTr3P5zpj+/6e8nzzDcV/hqjRX6moN5CbL0wQk+sPrhTP49IfcS5FiENX4O9xcVtbNlVy5L6rc71Efz+zDUpzfJhz/fIf8sKDvLOLMW/Ddn6oNwKCtuSvJ7bM0PtXImk8lkMv8j/wDbeDH2n5oa8QAAAABJRU5ErkJggg=="
              alt={`${name} perfil`}
              className="w-10 h-10 rounded-full object-center "
            />
            <p>{name}</p>
            <IconChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
};
