"use client";
import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import BirthdaysTable from "./components/BirthdaysTable";
import DepositChart from "./components/DepositChart";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        families: 0,
        people: 0,
        groups: 0,
        sundaySchool: 0,
    });
    const [birthdays, setBirthdays] = useState([]);
    const [anniversaries, setAnniversaries] = useState([]);
    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const [
                familiesRes,
                peopleRes,
                groupsRes,
                sundayRes,
                birthdaysRes,
                anniversariesRes,
                depositsRes,
            ] = await Promise.all([
                fetch("/api/families"),
                fetch("/api/people"),
                fetch("/api/groups"),
                fetch("/api/sunday-school"),
                fetch("/api/birthdays"),
                fetch("/api/anniversaries"),
                fetch("/api/deposits"),
            ]);

            const [
                families,
                people,
                groups,
                sunday,
                birthdays,
                anniversaries,
                deposits,
            ] = await Promise.all([
                familiesRes.json(),
                peopleRes.json(),
                groupsRes.json(),
                sundayRes.json(),
                birthdaysRes.json(),
                anniversariesRes.json(),
                depositsRes.json(),
            ]);

            setStats({
                families: families.total,
                people: people.total,
                groups: groups.total,
                sundaySchool: sunday.total,
            });
            setBirthdays(birthdays);
            setAnniversaries(anniversaries);
            setDeposits(deposits);
        }

        fetchData();
    }, []);

    return (
        <div className="flex w-full min-h-screen">
            <div className="flex flex-col flex-1">
                <main className="p-6 space-y-6">
                    <div className="grid md:grid-cols-4 gap-6">
                        <StatCard title="Families" value={stats.families} color="bg-green-600" />
                        <StatCard title="People" value={stats.people} color="bg-green-500" />
                        <StatCard title="Groups" value={stats.groups} color="bg-red-500" />
                        <StatCard title="Sunday School" value={stats.sundaySchool} color="bg-orange-400" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <BirthdaysTable title="Today's Birthdays" data={birthdays} />
                        <BirthdaysTable title="Today's Wedding Anniversaries" data={anniversaries} isAnniversary />
                    </div>

                    <DepositChart data={deposits} />
                </main>
            </div>
        </div>
    );
}
