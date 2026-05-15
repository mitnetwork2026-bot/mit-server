"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Camera, Edit2, Save, X, Mail, Phone, MapPin, 
  Calendar, Shield, Globe, Github, Twitter, Linkedin,
  Lock, Eye, EyeOff, Check, AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  displayName: string;
  email: string;
  bio: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
  profileImage: string;
  coverImage: string;
  joinDate: string;
  skills: string[];
  status: string;
}

export default function ProfilePage() {
  const { user, userProfile, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const profileImageRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
      setEditedProfile(userProfile);
    }
  }, [userProfile]);

  const saveProfile = async () => {
    if (!editedProfile) return;
    setSaving(true);
    try {
      await updateUserProfile(editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "cover") => {
    const file = e.target.files?.[0];
    if (!file || !editedProfile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (type === "profile") {
        setEditedProfile(prev => prev ? { ...prev, profileImage: base64 } : null);
      } else {
        setEditedProfile(prev => prev ? { ...prev, coverImage: base64 } : null);
      }
    };
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    if (!editedProfile) return;
    if (newSkill.trim() && !editedProfile.skills.includes(newSkill.trim())) {
      setEditedProfile(prev =>
        prev ? ({
          ...prev,
          skills: [...prev.skills, newSkill.trim()],
        }) : null
      );
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setEditedProfile(prev =>
      prev ? ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill),
      }) : null
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 pb-24 pt-24">
        <p className="text-emerald-400">Please login to view profile</p>
      </div>
    );
  }

  if (!profile || !editedProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 pb-24 pt-24">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mx-auto h-12 w-12 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 mb-4"
          />
          <p className="text-sm text-emerald-400/60">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-24 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl"
      >
        {/* Cover Image */}
        <div className="relative h-40 overflow-hidden rounded-t-2xl sm:h-48">
          {isEditing ? (
            <div 
              onClick={() => coverImageRef.current?.click()}
              className="flex h-full w-full cursor-pointer items-center justify-center bg-gradient-to-r from-emerald-900 to-emerald-700"
            >
              {editedProfile.coverImage ? (
                <img src={editedProfile.coverImage} alt="Cover" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-emerald-400/60">
                  <Camera size={32} />
                  <span className="text-sm">Add Cover Photo</span>
                </div>
              )}
              <input
                ref={coverImageRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "cover")}
                className="hidden"
              />
            </div>
          ) : (
            profile.coverImage ? (
              <img src={profile.coverImage} alt="Cover" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-emerald-900 to-emerald-700" />
            )
          )}
          
          {/* Edit Button */}
          <motion.button
            onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={saving}
            className="absolute right-4 top-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-emerald-500/20"
          >
            {saving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 rounded-full border-2 border-emerald-400/30 border-t-emerald-400"
                />
                Saving...
              </>
            ) : isEditing ? (
              <>
                <Save size={16} />
                Save
              </>
            ) : (
              <>
                <Edit2 size={16} />
                Edit
              </>
            )}
          </motion.button>

          {isEditing && (
            <button
              onClick={() => {
                setEditedProfile(profile);
                setIsEditing(false);
              }}
              className="absolute right-24 top-4 rounded-xl border border-red-500/30 bg-black/50 p-2 text-red-400 backdrop-blur-sm transition-colors hover:bg-red-500/20"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Profile Content */}
        <div className="rounded-b-2xl border border-t-0 border-emerald-500/20 bg-gradient-to-b from-emerald-950/80 to-black/80 p-4 backdrop-blur-xl sm:p-6">
          {/* Profile Image */}
          <div className="relative -mt-16 mb-4 sm:-mt-20">
            <div 
              className={`relative mx-auto h-28 w-28 overflow-hidden rounded-2xl border-4 border-emerald-950 bg-emerald-900 sm:h-32 sm:w-32 ${isEditing ? "cursor-pointer" : ""}`}
              onClick={() => isEditing && profileImageRef.current?.click()}
            >
              {(isEditing ? editedProfile.profileImage : profile.profileImage) ? (
                <img 
                  src={isEditing ? editedProfile.profileImage : profile.profileImage} 
                  alt="Profile" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User size={48} className="text-emerald-400/60" />
                </div>
              )}
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Camera size={24} className="text-white" />
                </div>
              )}
              <input
                ref={profileImageRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "profile")}
                className="hidden"
              />
            </div>
            
            {/* Online Status */}
            <div className="absolute bottom-1 right-1/2 translate-x-14 sm:translate-x-16">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-4 w-4 rounded-full border-2 border-emerald-950 bg-emerald-500"
              />
            </div>
          </div>

          {/* Name & Bio */}
          <div className="text-center">
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.displayName}
                onChange={(e) => setEditedProfile(prev => prev ? { ...prev, displayName: e.target.value } : null)}
                className="mb-2 w-full rounded-xl border border-emerald-500/30 bg-emerald-950/50 px-4 py-2 text-center text-xl font-bold text-white focus:border-emerald-500 focus:outline-none"
                placeholder="Your Name"
              />
            ) : (
              <h1 className="text-xl font-bold text-white sm:text-2xl">{profile.displayName || "User"}</h1>
            )}
            
            <p className="mt-1 text-sm text-emerald-400/60">{profile.email}</p>
            
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile(prev => prev ? { ...prev, bio: e.target.value } : null)}
                className="mt-3 w-full rounded-xl border border-emerald-500/30 bg-emerald-950/50 px-4 py-2 text-center text-sm text-emerald-400/80 focus:border-emerald-500 focus:outline-none"
                placeholder="Write something about yourself..."
                rows={2}
              />
            ) : (
              <p className="mt-2 text-sm text-emerald-400/80">{profile.bio}</p>
            )}
          </div>

          {/* Stats */}
          <div className="mt-6 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">128</p>
              <p className="text-xs text-emerald-400/60">Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">47</p>
              <p className="text-xs text-emerald-400/60">Operations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">99.9%</p>
              <p className="text-xs text-emerald-400/60">Success</p>
            </div>
          </div>

          {/* Info Fields */}
          <div className="mt-6 space-y-3">
            {/* Phone */}
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-4 py-3">
              <Phone size={18} className="text-emerald-400/60" />
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-emerald-400/40 focus:outline-none"
                  placeholder="Phone number"
                />
              ) : (
                <span className="text-sm text-emerald-400/80">{profile.phone || "Not set"}</span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-4 py-3">
              <MapPin size={18} className="text-emerald-400/60" />
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile(prev => prev ? { ...prev, location: e.target.value } : null)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-emerald-400/40 focus:outline-none"
                  placeholder="Location"
                />
              ) : (
                <span className="text-sm text-emerald-400/80">{profile.location || "Not set"}</span>
              )}
            </div>

            {/* Website */}
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-4 py-3">
              <Globe size={18} className="text-emerald-400/60" />
              {isEditing ? (
                <input
                  type="url"
                  value={editedProfile.website}
                  onChange={(e) => setEditedProfile(prev => prev ? { ...prev, website: e.target.value } : null)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-emerald-400/40 focus:outline-none"
                  placeholder="Website URL"
                />
              ) : (
                <span className="text-sm text-emerald-400/80">{profile.website || "Not set"}</span>
              )}
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-4 py-3">
              <Calendar size={18} className="text-emerald-400/60" />
              <span className="text-sm text-emerald-400/80">Joined {formatDate(profile.joinDate)}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-medium text-emerald-400/60">Social Links</h3>
            <div className="grid grid-cols-3 gap-3">
              {isEditing ? (
                <>
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-3 py-2">
                    <Github size={16} className="shrink-0 text-emerald-400/60" />
                    <input
                      type="text"
                      value={editedProfile.github}
                      onChange={(e) => setEditedProfile(prev => prev ? { ...prev, github: e.target.value } : null)}
                      className="w-full min-w-0 bg-transparent text-xs text-white placeholder-emerald-400/40 focus:outline-none"
                      placeholder="GitHub"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-3 py-2">
                    <Twitter size={16} className="shrink-0 text-emerald-400/60" />
                    <input
                      type="text"
                      value={editedProfile.twitter}
                      onChange={(e) => setEditedProfile(prev => prev ? { ...prev, twitter: e.target.value } : null)}
                      className="w-full min-w-0 bg-transparent text-xs text-white placeholder-emerald-400/40 focus:outline-none"
                      placeholder="Twitter"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-3 py-2">
                    <Linkedin size={16} className="shrink-0 text-emerald-400/60" />
                    <input
                      type="text"
                      value={editedProfile.linkedin}
                      onChange={(e) => setEditedProfile(prev => prev ? { ...prev, linkedin: e.target.value } : null)}
                      className="w-full min-w-0 bg-transparent text-xs text-white placeholder-emerald-400/40 focus:outline-none"
                      placeholder="LinkedIn"
                    />
                  </div>
                </>
              ) : (
                <>
                  <a href={profile.github ? `https://github.com/${profile.github}` : "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-3 py-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400">
                    <Github size={18} />
                  </a>
                  <a href={profile.twitter ? `https://twitter.com/${profile.twitter}` : "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-3 py-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400">
                    <Twitter size={18} />
                  </a>
                  <a href={profile.linkedin ? `https://linkedin.com/in/${profile.linkedin}` : "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-3 py-2 text-emerald-400/60 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400">
                    <Linkedin size={18} />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-medium text-emerald-400/60">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editedProfile.skills : profile.skills).map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400"
                >
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill(skill)} className="ml-1 text-emerald-400/60 hover:text-red-400">
                      <X size={12} />
                    </button>
                  )}
                </motion.span>
              ))}
              {isEditing && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    className="w-24 rounded-lg border border-emerald-500/30 bg-emerald-950/50 px-2 py-1.5 text-xs text-white placeholder-emerald-400/40 focus:outline-none"
                    placeholder="Add skill"
                  />
                  <button onClick={addSkill} className="rounded-lg bg-emerald-500/20 p-1.5 text-emerald-400 hover:bg-emerald-500/30">
                    <Check size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
            <Shield size={18} className="text-emerald-400" />
            <span className="text-xs text-emerald-400/80">Profile secured with end-to-end encryption</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
