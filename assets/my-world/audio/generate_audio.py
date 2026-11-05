"""Original synthesized, muted-by-default My World effects. No samples or paid services."""
from pathlib import Path
import numpy as np
from scipy.signal import butter,sosfilt
import wave, subprocess

HERE=Path(__file__).resolve().parent
SRC=HERE/"source";WEB=HERE/"web"
SRC.mkdir(exist_ok=True);WEB.mkdir(exist_ok=True)
SR=22050
rng=np.random.default_rng(1905)
def filt(x,low=None,high=None):
    if low and high: spec=(low,high);kind="bandpass"
    elif high: spec=high;kind="lowpass"
    else: spec=low;kind="highpass"
    return sosfilt(butter(3,spec,btype=kind,fs=SR,output="sos"),x)
def normalize(x,target=.65):
    x=np.asarray(x,dtype=float)
    peak=np.max(np.abs(x)) or 1
    return np.clip(x*target/peak,-1,1)
def wav(path,x):
    pcm=(normalize(x)*32767).astype("<i2")
    with wave.open(str(path),"wb") as f:
        f.setnchannels(1);f.setsampwidth(2);f.setframerate(SR);f.writeframes(pcm.tobytes())
def save(name,x):
    source=SRC/(name+".wav");target=WEB/(name+".ogg");wav(source,x)
    subprocess.run(["ffmpeg","-y","-hide_banner","-loglevel","error","-i",str(source),
        "-c:a","libvorbis","-q:a","4",str(target)],check=True)
    print(name,len(x)/SR,target.stat().st_size)
def loopfade(x,n=.16):
    k=int(SR*n);y=x.copy();mix=np.linspace(0,1,k)
    y[:k]=x[:k]*mix+x[-k:]*(1-mix)
    y[-k:]=y[:k]
    return y
def env(n,attack=.02,decay=.2):
    t=np.arange(n)/SR
    return np.minimum(1,t/max(attack,.001))*np.exp(-t/max(decay,.001))

duration=8;n=int(SR*duration);t=np.arange(n)/SR
noise=rng.normal(size=n)
water=filt(noise,low=190,high=3200)
water*=.29+.07*np.sin(2*np.pi*.37*t)+.045*np.sin(2*np.pi*1.13*t)
water+=.07*filt(rng.normal(size=n),low=70,high=380)
for p in (1.3,3.5,5.7,7.2):
    idx=int(p*SR);length=int(.22*SR)
    if idx+length<n:
        z=np.arange(length)/SR
        water[idx:idx+length]+=.05*np.sin(2*np.pi*(680-390*z)*z)*np.exp(-z*19)
save("cascade_loop",loopfade(water))

air=filt(rng.normal(size=n),low=170,high=1900)*(.12+.03*np.sin(2*np.pi*.18*t))
garden=air
for p,freq in [(1.1,2250),(2.7,1930),(5.15,2470),(6.8,2070)]:
    idx=int(p*SR);length=int(.22*SR);z=np.arange(length)/SR
    garden[idx:idx+length]+=.04*np.sin(2*np.pi*(freq*z+190*z*z))*np.sin(np.pi*z/.22)**2
save("garden_loop",loopfade(garden))

n=int(.38*SR);t=np.arange(n)/SR
foot=filt(rng.normal(size=n),low=80,high=650)*env(n,.007,.07)
foot+=.35*np.sin(2*np.pi*73*t)*env(n,.004,.055)
save("soft_footstep",foot)

n=int(.7*SR);t=np.arange(n)/SR
pitch=280+85*np.sin(2*np.pi*1.8*t)
phase=2*np.pi*np.cumsum(pitch)/SR
happy=(np.sin(phase)+.35*np.sin(2*phase)+.1*np.sin(3*phase))
happy*=env(n,.035,.28)*(.65+.35*np.sin(2*np.pi*4*t))
happy+=.07*filt(rng.normal(size=n),low=430,high=1700)*env(n,.04,.19)
save("dog_happy",happy)

n=int(.48*SR);t=np.arange(n)/SR
pitch=175-90*t
phase=2*np.pi*np.cumsum(pitch)/SR
bark=(np.sin(phase)+.6*np.sin(2*phase)+.3*np.sin(3*phase))*env(n,.006,.095)
bark+=.23*filt(rng.normal(size=n),low=250,high=1600)*env(n,.008,.075)
save("dog_bark",bark)

n=int(.31*SR);t=np.arange(n)/SR
bell=(np.sin(2*np.pi*690*t)+.33*np.sin(2*np.pi*1384*t))*env(n,.003,.09)
save("gentle_select",bell)
