import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    MapPin,
    Mail,
    GraduationCap,
    Briefcase,
    Code2,
    Heart,
    UserRound,
    Pencil
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { token } = useAuth();

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                setError("Please login to view your profile");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:5000/user/profile",
                    {
                        method: "GET",
                        headers: {
                            Authorization: token,
                        }
                    }
                );

                const data = await response.json();

                console.log("Profile response:", data);

                if (!response.ok) {
                    setError(data.message || "Unable to fetch profile");
                    return;
                }

                setUser(data.user);
                setProfile(data.profile);
            } catch {
                setError("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 px-6 pt-32">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="text-slate-500">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 px-6 pt-32">
                <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
                    <p className="text-red-500">{error}</p>

                    <Link
                        to="/login"
                        className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    if (!user || !profile) {
        return null;
    }

    const role = user.role;

    return (
        <div className="min-h-screen bg-slate-50 px-6 pb-16 pt-28">
            <div className="mx-auto max-w-6xl">

                <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

                    <div className="h-40 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-400" />

                    <div className="px-8 pb-8">

                        <div className="-mt-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                            <div className="flex items-end gap-5">

                                <div className="h-28 w-28 rounded-full bg-white p-1 shadow-md">

                                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-indigo-600">

                                        {profile.profilePicture ? (
                                            <img
                                                src={profile.profilePicture}
                                                alt={user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <UserRound size={45} />
                                        )}

                                    </div>

                                </div>

                                <div className="pb-2">

                                    <h1 className="text-3xl font-bold text-slate-800">
                                        {user.name}
                                    </h1>

                                    <p className="mt-1 text-slate-500">
                                        {role}
                                    </p>

                                    {profile.department && (
                                        <p className="mt-1 text-sm text-slate-400">
                                            {profile.department}
                                        </p>
                                    )}

                                </div>

                            </div>

                            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-slate-700 transition hover:bg-slate-50">
                                <Pencil size={17} />
                                Edit Profile
                            </button>

                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

                            <div className="space-y-6 lg:col-span-2">

                                <section className="rounded-2xl border border-slate-100 p-6">

                                    <h2 className="mb-4 text-xl font-semibold text-slate-800">
                                        About
                                    </h2>

                                    <p className="leading-7 text-slate-600">
                                        {profile.bio || "No bio added yet."}
                                    </p>

                                </section>

                                {role === "Student" && (
                                    <section className="rounded-2xl border border-slate-100 p-6">

                                        <h2 className="mb-5 text-xl font-semibold text-slate-800">
                                            Student Information
                                        </h2>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                            <InfoItem
                                                icon={<GraduationCap size={19} />}
                                                label="Department"
                                                value={profile.department}
                                            />

                                            <InfoItem
                                                icon={<GraduationCap size={19} />}
                                                label="Graduation Year"
                                                value={profile.graduationYear}
                                            />

                                        </div>

                                    </section>
                                )}

                                {role === "Alumni" && (
                                    <section className="rounded-2xl border border-slate-100 p-6">

                                        <h2 className="mb-5 text-xl font-semibold text-slate-800">
                                            Professional Information
                                        </h2>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                            <InfoItem
                                                icon={<Briefcase size={19} />}
                                                label="Current Company"
                                                value={profile.currentCompany}
                                            />

                                            <InfoItem
                                                icon={<Briefcase size={19} />}
                                                label="Job Title"
                                                value={profile.jobTitle}
                                            />

                                            <InfoItem
                                                icon={<GraduationCap size={19} />}
                                                label="Graduation Year"
                                                value={profile.graduationYear}
                                            />

                                            <InfoItem
                                                icon={<Briefcase size={19} />}
                                                label="Experience"
                                                value={`${profile.experience || 0} years`}
                                            />

                                            <InfoItem
                                                icon={<MapPin size={19} />}
                                                label="Current Location"
                                                value={profile.currentLocation}
                                            />

                                            <InfoItem
                                                icon={<Heart size={19} />}
                                                label="Mentor"
                                                value={profile.isMentor ? "Yes" : "No"}
                                            />

                                        </div>

                                    </section>
                                )}

                                {role === "Faculty" && (
                                    <section className="rounded-2xl border border-slate-100 p-6">

                                        <h2 className="mb-5 text-xl font-semibold text-slate-800">
                                            Faculty Information
                                        </h2>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                            <InfoItem
                                                icon={<GraduationCap size={19} />}
                                                label="Department"
                                                value={profile.department}
                                            />

                                            <InfoItem
                                                icon={<Briefcase size={19} />}
                                                label="Designation"
                                                value={profile.designation}
                                            />

                                            <InfoItem
                                                icon={<Code2 size={19} />}
                                                label="Specialization"
                                                value={profile.specialization}
                                            />

                                            <InfoItem
                                                icon={<Briefcase size={19} />}
                                                label="Experience"
                                                value={`${profile.experience || 0} years`}
                                            />

                                        </div>

                                    </section>
                                )}

                                {(role === "Student" || role === "Alumni") && (
                                    <TagSection
                                        title="Skills"
                                        icon={<Code2 size={20} />}
                                        items={profile.skills}
                                    />
                                )}

                                {(role === "Student" || role === "Alumni") && (
                                    <TagSection
                                        title="Interests"
                                        icon={<Heart size={20} />}
                                        items={profile.interests}
                                    />
                                )}

                                {role === "Faculty" && (
                                    <TagSection
                                        title="Research Interests"
                                        icon={<Code2 size={20} />}
                                        items={profile.researchInterests}
                                    />
                                )}

                            </div>

                            <div className="space-y-6">

                                <section className="rounded-2xl border border-slate-100 p-6">

                                    <h2 className="mb-5 text-lg font-semibold text-slate-800">
                                        Contact
                                    </h2>

                                    <div className="space-y-4">

                                        <ContactItem
                                            icon={<Mail size={18} />}
                                            text={user.email}
                                        />

                                        {profile.linkedIn && (
                                            <a
                                                href={profile.linkedIn}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-3 text-slate-600 hover:text-indigo-600"
                                            >
                                                <Briefcase size={18} />
                                                LinkedIn
                                            </a>
                                        )}

                                        {profile.gitHub && (
                                            <a
                                                href={profile.gitHub}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-3 text-slate-600 hover:text-indigo-600"
                                            >
                                                <Code2 size={18} />
                                                GitHub
                                            </a>
                                        )}

                                    </div>

                                </section>

                                <section className="rounded-2xl border border-slate-100 p-6">

                                    <h2 className="mb-4 text-lg font-semibold text-slate-800">
                                        Profile
                                    </h2>

                                    <div className="space-y-3 text-sm">

                                        <div className="flex justify-between">
                                            <span className="text-slate-400">
                                                Role
                                            </span>

                                            <span className="font-medium text-slate-700">
                                                {role}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-slate-400">
                                                Department
                                            </span>

                                            <span className="font-medium text-slate-700">
                                                {profile.department || "—"}
                                            </span>
                                        </div>

                                    </div>

                                </section>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => {
    return (
        <div className="flex items-start gap-3">
            <div className="text-indigo-600">
                {icon}
            </div>

            <div>
                <p className="text-xs text-slate-400">
                    {label}
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                    {value || "Not provided"}
                </p>
            </div>
        </div>
    );
};

const ContactItem = ({ icon, text }) => {
    return (
        <div className="flex items-center gap-3 text-slate-600">
            {icon}
            {text}
        </div>
    );
};

const TagSection = ({ title, icon, items }) => {
    return (
        <section className="rounded-2xl border border-slate-100 p-6">

            <div className="mb-5 flex items-center gap-3 text-indigo-600">
                {icon}

                <h2 className="text-xl font-semibold text-slate-800">
                    {title}
                </h2>
            </div>

            <div className="flex flex-wrap gap-2">

                {items && items.length > 0 ? (
                    items.map((item, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm text-indigo-600"
                        >
                            {item}
                        </span>
                    ))
                ) : (
                    <p className="text-sm text-slate-400">
                        No information added yet.
                    </p>
                )}

            </div>

        </section>
    );
};

export default Profile;