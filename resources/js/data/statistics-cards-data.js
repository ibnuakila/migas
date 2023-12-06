import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Current Periode",
    value: "2023",
    footer: {
      color: "text-green-500",
      value: "Last Periode",
      label: "2022",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "PICS",
    value: "35",
    footer: {
      color: "text-green-500",
      value: "PICS",
      label: "",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Users",
    value: "1",
    footer: {
      color: "text-red-500",
      value: "Active Users",
      label: "1",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Total Indikator",
    value: "585",
    footer: {
      color: "text-green-500",
      value: "Total Index",
      label: "15",
    },
  },
];

export default statisticsCardsData;
