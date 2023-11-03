"use client"
import React, {useState} from 'react';
import {City, Country, ICity, IState, State} from "country-state-city";
import {useRouter} from "next/navigation";
import {CityOption, CountryOption, StateOption} from "@/typings";
import {defaultCountry} from "@/lib/constants";
import Selector from "@components/Selector";

const CityPicker: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<CountryOption>(defaultCountry);
    const [selectedState, setSelectedState] = useState<StateOption | null>(null);
    const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

    const router = useRouter();

    const handleSelectedCountry = (c: CountryOption) => {
        setSelectedCountry(c);
        setSelectedState(null);
    }

    const handleSelectedState = (s: StateOption) => setSelectedState(s);

    const handleSelectedCity = (c: CityOption) => {
        setSelectedCity(c);
        router.push(`/location/${c?.value?.name}/${c?.value?.latitude}/${c?.value?.longitude}`)
    }

    const getCountries = () => Country.getAllCountries().map((c) => ({
        value: {
            latitude: c.latitude,
            longitude: c.longitude,
            isoCode: c.isoCode,
        },
        label: c.name
    }));

    const getStates = () => State.getStatesOfCountry(selectedCountry?.value?.isoCode).map((s: IState) => ({
        value: {
            countryCode: s.countryCode,
            stateCode: s.isoCode,
        },
        label: s.name
    }));

    const getCities = () => {
        if (selectedState?.value?.countryCode && selectedState?.value?.stateCode) {
            return City.getCitiesOfState(selectedState.value.countryCode, selectedState.value.stateCode).map((c: ICity) => ({
                value: {
                    latitude: c.latitude,
                    longitude: c.longitude,
                    countryCode: c.countryCode,
                    name: c.name,
                    stateCode: c.stateCode,
                },
                label: c.name
            }))
        } else {
            return [];
        }
    };

    return (
            <div className="space-y-4">
                <Selector
                    label={"Country"}
                    value={selectedCountry}
                    onChange={handleSelectedCountry}
                    options={getCountries()}
                />

                {selectedCountry && (
                    <Selector
                        label={"State"}
                        value={selectedState}
                        onChange={handleSelectedState}
                        options={getStates()}
                    />
                )}

                {selectedState && (
                    <Selector
                        label={"City"}
                        value={selectedCity}
                        onChange={handleSelectedCity}
                        options={getCities()}
                    />
                )}
            </div>
    );
}

export default CityPicker;
