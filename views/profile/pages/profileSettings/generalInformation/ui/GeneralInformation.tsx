import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  DatePicker,
  Input,
  Selectbox,
  TextAreaComponent
} from "@irondragons/ui-lib-inctagram";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { InputsName, generalSchema } from "../lib/schema";
import { AddAvatarSection } from "./AddAvatarSection";
import s from "./generalInformation.module.scss";

export const GeneralInformation = () => {
  const {
    register,
    trigger,
    clearErrors,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<InputsName>({
    resolver: zodResolver(generalSchema),
    mode: "onBlur",
  });

  const [range, setRange] = useState<DateRange | undefined>({ from: new Date() })

  return (
    <div>
      <div className={s.content}>
        <AddAvatarSection/>
        <div className={s.rightContent}>
          <div className={s.formName}>
            <Input
              required
              label={"Username"}
              id={"username"}
              inputType={"text"}
              fullWidth
              errorText={errors.username?.message}
              {...register("username", {
                onChange: () => clearErrors("username"),
              })}
            />
            <Input
              required
              label={"First name"}
              id={"firstname"}
              inputType={"text"}
              fullWidth
              errorText={errors.firstname?.message}
              {...register("firstname", {
                onChange: () => clearErrors("firstname"),
              })}
            />
            <Input
              required
              label={"Last name"}
              id={"lastname"}
              inputType={"text"}
              fullWidth
              errorText={errors.lastname?.message}
              {...register("lastname", {
                onChange: () => clearErrors("lastname"),
              })}
            />
          </div>
          <div className={s.datePicker}>
            <DatePicker
              label={"Date of birth"}
              value={range}
              onChange={setRange}
              // fullWidth
            />
          </div>
          <div className={s.selectLive}>
            <div className={s.selectContainer}>
              <Selectbox
                idProp="select-country"
                label="Select your country"
                name="country"
                options={[
                  { label: "Украина", value: "ua" },
                  { label: "Польша", value: "pl" },
                  { label: "Германия", value: "de" },
                  { label: "Франция", value: "fr" },
                  { label: "Италия", value: "it" },
                  { label: "Испания", value: "es" },
                  { label: "Нидерланды", value: "nl" },
                  { label: "Бельгия", value: "be" },
                ]}
                placeholder="Country"
                fullWidth
              />
            </div>
            <div className={s.selectContainer}>
              <Selectbox
                idProp="select-city"
                label="Select your city"
                name="city"
                options={[
                  { label: "Харьков", value: "ua" },
                  { label: "Киев", value: "pl" },
                  { label: "Минск", value: "de" },
                  { label: "Москва", value: "fr" },
                  { label: "Кельн", value: "es" },
                  { label: "Штутгарт", value: "nl" },
                  { label: "Берлин", value: "be" },
                ]}
                placeholder="City"
                fullWidth
              />
            </div>
          </div>
          <div className={s.ariaText}>
            <TextAreaComponent
              placeholder="Type something..."
              variant="surface"
              label="About me"
              id="1"
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className={s.footer}>
        <div className={s.lineFooter}></div>
        <div className={s.buttonFooter}>
          <Button
            variant="primary"
            children={"Save Changes"}
            disabled={!isValid}
          ></Button>
        </div>
      </div>
    </div>
  );
};
