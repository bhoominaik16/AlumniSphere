import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  Building2,
  Check,
} from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",

    department: "",
    graduationYear: "",
    skills: [],
    interests: [],
    linkedIn: "",
    gitHub: "",
    bio: "",
    profilePicture: "",
    resume: "",

    designation: "",
    specialization: "",
    researchInterests: [],
    experience: "",

    currentCompany: "",
    jobTitle: "",
    currentLocation: "",
    isMentor: false,
  });

  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [researchInput, setResearchInput] = useState("");

  const roles = [
    {
      value: "Student",
      title: "Student",
      icon: <GraduationCap size={22} />,
      description: "Find mentors, opportunities and connections.",
    },
    {
      value: "Alumni",
      title: "Alumni",
      icon: <BriefcaseBusiness size={22} />,
      description: "Mentor students and share opportunities.",
    },
    {
      value: "Faculty",
      title: "Faculty",
      icon: <Building2 size={22} />,
      description: "Connect the community and organize events.",
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addArrayValue = (field, value, setInput) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    setFormData({
      ...formData,
      [field]: [...formData[field], trimmedValue],
    });

    setInput("");
  };

  const removeArrayValue = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select your role");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  let roleData = {};

  if (formData.role === "Student") {
    roleData = {
      department: formData.department,
      graduationYear: Number(formData.graduationYear),
      skills: formData.skills,
      interests: formData.interests,
      linkedIn: formData.linkedIn,
      gitHub: formData.gitHub,
      bio: formData.bio,
      profilePicture: formData.profilePicture,
      resume: formData.resume
    };
  }

  if (formData.role === "Alumni") {
    roleData = {
      department: formData.department,
      graduationYear: Number(formData.graduationYear),
      currentCompany: formData.currentCompany,
      jobTitle: formData.jobTitle,
      experience: Number(formData.experience || 0),
      skills: formData.skills,
      interests: formData.interests,
      currentLocation: formData.currentLocation,
      linkedIn: formData.linkedIn,
      gitHub: formData.gitHub,
      bio: formData.bio,
      profilePicture: formData.profilePicture,
      isMentor: formData.isMentor
    };
  }

  if (formData.role === "Faculty") {
    roleData = {
      department: formData.department,
      designation: formData.designation,
      specialization: formData.specialization,
      researchInterests: formData.researchInterests,
      experience: Number(formData.experience || 0),
      linkedIn: formData.linkedIn,
      bio: formData.bio,
      profilePicture: formData.profilePicture
    };
  }

  const signupData = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    role: formData.role,
    ...roleData
  };

  try {
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupData)
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed");
      console.log(data);
      return;
    }

    alert("Registration successful");
    navigate("/login");

  } catch (error) {
    console.error(error);
    alert("Unable to connect to server");
  }
};

  const renderTags = (items, field) => {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            type="button"
            key={`${item}-${index}`}
            onClick={() => removeArrayValue(field, index)}
            className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-100"
          >
            {item} ×
          </button>
        ))}
      </div>
    );
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-600";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mx-auto w-full max-w-3xl">

        <Link
          to="/"
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to AlumniSphere
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

          <div className="mb-4">
            <p className="text-sm font-semibold text-indigo-600">
              Join the community
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {step === 1
                ? "Tell us a little about yourself."
                : `Complete your ${formData.role.toLowerCase()} profile.`}
            </p>
          </div>

          <div className="mb-5 flex items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {step > 1 ? <Check size={17} /> : "1"}
              </div>

              <span className="text-sm font-semibold text-slate-700">
                Account
              </span>
            </div>

            <div className="mx-4 h-px flex-1 bg-slate-200">
              <div
                className={`h-full bg-indigo-600 transition-all ${
                  step === 2 ? "w-full" : "w-0"
                }`}
              />
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                  step === 2
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                2
              </div>

              <span
                className={`text-sm font-semibold ${
                  step === 2 ? "text-slate-700" : "text-slate-400"
                }`}
              >
                Profile
              </span>
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">

              <div>
                <label className={labelClass}>Full name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  I am joining as
                </label>

                <div className="grid gap-3 md:grid-cols-3">
                  {roles.map((role) => (
                    <button
                      type="button"
                      key={role.value}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          role: role.value,
                        })
                      }
                      className={`rounded-2xl border p-5 text-left transition ${
                        formData.role === role.value
                          ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                          : "border-slate-200 bg-slate-50 hover:border-indigo-200 hover:bg-indigo-50/50"
                      }`}
                    >
                      <div
                        className={
                          formData.role === role.value
                            ? "text-indigo-600"
                            : "text-slate-500"
                        }
                      >
                        {role.icon}
                      </div>

                      <p className="mt-4 font-semibold text-slate-800">
                        {role.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {role.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Next
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="rounded-xl bg-indigo-50 px-4 py-3">
                <p className="text-sm text-indigo-700">
                  Creating account as{" "}
                  <span className="font-bold">{formData.role}</span>
                </p>
              </div>

              <div>
                <label className={labelClass}>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Information Technology"
                  className={inputClass}
                  required
                />
              </div>

              {formData.role === "Student" && (
                <>
                  <div>
                    <label className={labelClass}>
                      Graduation Year
                    </label>

                    <input
                      type="number"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      placeholder="2027"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Skills</label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="e.g. React"
                        className={inputClass}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayValue(
                              "skills",
                              skillInput,
                              setSkillInput
                            );
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          addArrayValue(
                            "skills",
                            skillInput,
                            setSkillInput
                          )
                        }
                        className="rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white"
                      >
                        Add
                      </button>
                    </div>

                    {renderTags(formData.skills, "skills")}
                  </div>

                  <div>
                    <label className={labelClass}>Interests</label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={interestInput}
                        onChange={(e) =>
                          setInterestInput(e.target.value)
                        }
                        placeholder="e.g. Web Development"
                        className={inputClass}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayValue(
                              "interests",
                              interestInput,
                              setInterestInput
                            );
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          addArrayValue(
                            "interests",
                            interestInput,
                            setInterestInput
                          )
                        }
                        className="rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white"
                      >
                        Add
                      </button>
                    </div>

                    {renderTags(formData.interests, "interests")}
                  </div>

                  <div>
                    <label className={labelClass}>
                      LinkedIn
                    </label>

                    <input
                      type="text"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      GitHub
                    </label>

                    <input
                      type="text"
                      name="gitHub"
                      value={formData.gitHub}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Bio</label>

                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us a little about yourself..."
                      rows="4"
                      className={inputClass}
                    />
                  </div>
                </>
              )}

              {formData.role === "Alumni" && (
                <>
                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className={labelClass}>
                        Graduation Year
                      </label>

                      <input
                        type="number"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        placeholder="2023"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Current Company
                      </label>

                      <input
                        type="text"
                        name="currentCompany"
                        value={formData.currentCompany}
                        onChange={handleChange}
                        placeholder="Company name"
                        className={inputClass}
                        required
                      />
                    </div>

                  </div>

                  <div>
                    <label className={labelClass}>
                      Job Title
                    </label>

                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="Software Engineer"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className={labelClass}>
                        Experience (years)
                      </label>

                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="2"
                        min="0"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Current Location
                      </label>

                      <input
                        type="text"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        placeholder="Mumbai"
                        className={inputClass}
                      />
                    </div>

                  </div>

                  <div>
                    <label className={labelClass}>
                      Skills
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="e.g. Node.js"
                        className={inputClass}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayValue(
                              "skills",
                              skillInput,
                              setSkillInput
                            );
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          addArrayValue(
                            "skills",
                            skillInput,
                            setSkillInput
                          )
                        }
                        className="rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white"
                      >
                        Add
                      </button>
                    </div>

                    {renderTags(formData.skills, "skills")}
                  </div>

                  <div>
                    <label className={labelClass}>
                      LinkedIn
                    </label>

                    <input
                      type="text"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      GitHub
                    </label>

                    <input
                      type="text"
                      name="gitHub"
                      value={formData.gitHub}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Bio
                    </label>

                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about your professional journey..."
                      rows="4"
                      className={inputClass}
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <input
                      type="checkbox"
                      name="isMentor"
                      checked={formData.isMentor}
                      onChange={handleChange}
                      className="h-4 w-4 accent-indigo-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        I want to become a mentor
                      </p>

                      <p className="text-xs text-slate-500">
                        Allow students to request mentorship from you.
                      </p>
                    </div>
                  </label>
                </>
              )}

              {formData.role === "Faculty" && (
                <>
                  <div>
                    <label className={labelClass}>
                      Designation
                    </label>

                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Assistant Professor"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Specialization
                    </label>

                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      placeholder="Artificial Intelligence"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Research Interests
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={researchInput}
                        onChange={(e) =>
                          setResearchInput(e.target.value)
                        }
                        placeholder="e.g. Machine Learning"
                        className={inputClass}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayValue(
                              "researchInterests",
                              researchInput,
                              setResearchInput
                            );
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          addArrayValue(
                            "researchInterests",
                            researchInput,
                            setResearchInput
                          )
                        }
                        className="rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white"
                      >
                        Add
                      </button>
                    </div>

                    {renderTags(
                      formData.researchInterests,
                      "researchInterests"
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>
                      Experience (years)
                    </label>

                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="5"
                      min="0"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      LinkedIn
                    </label>

                    <input
                      type="text"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Bio
                    </label>

                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about your academic journey..."
                      rows="4"
                      className={inputClass}
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <ArrowLeft size={17} />
                  Back
                </button>

                <button
                  type="submit"
                  className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Register
                  <Check size={17} />
                </button>

              </div>

            </form>
          )}

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
};

export default Signup;