export default class PromotionDiscount {
    private _Favorable : number;
    public get Favorable () : number {
      return this._Favorable;
    }
    public set Favorable (v : number) {
      this._Favorable = v;
    }

    private _FillAmount : number;
    public get FillAmount () : number {
      return this._FillAmount;
    }
    public set FillAmount (v : number) {
      this._FillAmount = v;
    }

    private _DiscountAmount : number;
    public get DiscountAmount () : number {
      return this._DiscountAmount;
    }
    public set DiscountAmount (v : number) {
      this._DiscountAmount = v;
    }

    private _SettlementProfilesList : any;
    public get SettlementProfilesList () : any {
      return this._SettlementProfilesList;
    }
    public set SettlementProfilesList (v : any) {
      this._SettlementProfilesList = v;
    }

    private _Id : string;
    public get Id () : string {
      return this._Id;
    }
    public set Id (v : string) {
      this._Id = v;
    }

    private _IsDiscount : boolean;
    public get IsDiscount () : boolean {
      return this._IsDiscount;
    }
    public set IsDiscount (v : boolean) {
      this._IsDiscount = v;
    }

    private _IsTotalOrderDiscount : boolean;
    public get IsTotalOrderDiscount () : boolean {
      return this._IsTotalOrderDiscount;
    }
    public set IsTotalOrderDiscount (v : boolean) {
      this._IsTotalOrderDiscount = v;
    }

    private _IsSuperpostion : string;
    public get IsSuperpostion () : string {
      return this._IsSuperpostion;
    }
    public set IsSuperpostion (v : string) {
      this._IsSuperpostion = v;
    }

    private _MemberName : string;
    public get MemberName () : string {
      return this._MemberName;
    }
    public set MemberName (v : string) {
      this._MemberName = v;
    }
    constructor (_Favorable: number = 0, _FillAmount: number = 0, _DiscountAmount: number = 0, _Id:string = '-1', _IsDiscount:boolean = false, _IsTotalOrderDiscount:boolean = false, _IsSuperposition: string = '', _MemberName:string = '', _SettlementProfilesList:any = []) {
      this._Favorable = _Favorable;
      this._FillAmount = _FillAmount;
      this._DiscountAmount = _DiscountAmount;
      this._Id = _Id;
      this._IsDiscount = _IsDiscount;
      this._IsSuperpostion = _IsSuperposition;
      this._MemberName = _MemberName;
      this._SettlementProfilesList = _SettlementProfilesList;
      this._IsTotalOrderDiscount = _IsTotalOrderDiscount;
    }
}
