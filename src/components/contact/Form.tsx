import type { RootObject } from "../../interfaces/dbData";
interface FormProps {
  data: RootObject;
}

const Form: React.FC<FormProps> = ({ data }: FormProps) => {
  return (
    <div className="">
      {/* @ts-ignore */}
      <form-contact
        to={data.dataGeneral.emails[0].email}
        services={
          // anidarlos con un join
          data.services.map((service) => service.title).join(",")
        }
        server="https://email-server-r-8fb46242f2ca.herokuapp.com/email/genius"
        img={data.logos.primary}
        emailcolor="1"
        isenglish="true"
      >
        {/* @ts-ignore */}
      </form-contact>
    </div>
  );
};

export default Form;
